// src/components/IntroSection.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled, { css, keyframes } from "styled-components";
import Background from "../assets/svg/background.svg";
import GitHubStats from "./GitHubStats";

/** ========= GitHub API 설정 ========= */
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN ?? "";
const API_TIMEOUT = 10_000;
const PER_PAGE = 100;
const MAX_LANG_REPOS = Number(process.env.REACT_APP_MAX_LANG_REPOS ?? 60);

type IntroSectionProps = {
  roleLabel: string;
  smallName: string;
  bigTitle: string;
  paragraphs: string[];
  silhouetteSrc: string;
  accent?: string;
  onNext?: () => void;
  minHeight?: string;
  gitHubUsername?: string;
  stack?: string[];
};

const languageColors: Record<string, string> = {
  Java: "#7FE175",
  Dart: "#afd7aa",
  CSS: "#66c2bd",
  HTML: "#6bcba3",
  "C++": "#58c1e4",
  CMake: "#55b771",
  JavaScript: "#4ad66d",
  Swift: "#77c2d7",
};

const IntroSection: React.FC<IntroSectionProps> = ({
  roleLabel,
  smallName,
  bigTitle,
  paragraphs,
  silhouetteSrc,
  accent = "#9EE37D",
  minHeight = "100vh",
  stack,
  gitHubUsername,
}) => {
  const [showStats, setShowStats] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [topbarInView, setTopbarInView] = useState(false);

  // GitHub 데이터 상태
  const [repoCount, setRepoCount] = useState<number>(0);
  const [languages, setLanguages] = useState<
    { lang: string; pct: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const topbarRef = useRef<HTMLDivElement | null>(null);

  /** ====== GitHub 데이터 로드 ====== */
  useEffect(() => {
    if (!gitHubUsername) return;

    const axiosInstance = axios.create({
      baseURL: GITHUB_API_BASE,
      timeout: API_TIMEOUT,
      headers: GITHUB_TOKEN
        ? {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          }
        : { Accept: "application/vnd.github+json" },
    });

    const fetchAllRepos = async (username: string) => {
      // MAX_LANG_REPOS까지 페이징으로 가져오기
      const results: any[] = [];
      let page = 1;
      while (results.length < MAX_LANG_REPOS) {
        const { data } = await axiosInstance.get(`/users/${username}/repos`, {
          params: {
            per_page: PER_PAGE,
            page,
            sort: "pushed",
          },
        });
        results.push(...data);
        if (data.length < PER_PAGE) break; // 마지막 페이지
        page += 1;
      }
      return results.slice(0, MAX_LANG_REPOS);
    };

    const fetchLanguages = async (username: string, repos: any[]) => {
      const langBytes: Record<string, number> = {};
      await Promise.all(
        repos.map(async (repo) => {
          try {
            const { data } = await axiosInstance.get(
              `/repos/${username}/${repo.name}/languages`
            );
            for (const [lang, bytes] of Object.entries<number>(data)) {
              langBytes[lang] = (langBytes[lang] || 0) + bytes;
            }
          } catch {
            // private이거나 접근 실패 레포는 무시
          }
        })
      );
      const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
      if (!total) return [];

      const stats = Object.entries(langBytes)
        .map(([lang, bytes]) => ({
          lang,
          pct: Number(((bytes / total) * 100).toFixed(2)),
          color: languageColors[lang] || "#ccc",
        }))
        // 큰 비중 순
        .sort((a, b) => b.pct - a.pct);

      return stats;
    };

    const run = async () => {
      try {
        setLoading(true);

        // 1) 사용자 정보
        const userRes = await axiosInstance.get(`/users/${gitHubUsername}`);
        setRepoCount(Number(userRes.data?.public_repos ?? 0));

        // 2) 레포 목록 페칭
        const repos = await fetchAllRepos(gitHubUsername);

        // 3) 언어 통계
        const langs = await fetchLanguages(gitHubUsername, repos);
        setLanguages(langs);
      } catch (e) {
        console.error("GitHub API error:", e);
        // 안전망: 실패 시 비워두기
        setRepoCount(0);
        setLanguages([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [gitHubUsername]);

  /** ====== TopBar 인터섹션 애니메이션 ====== */
  useEffect(() => {
    if (!topbarRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];
        if (ent.isIntersecting) {
          setTopbarInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(topbarRef.current);
    return () => io.disconnect();
  }, []);

  /** ====== 좌/우키 또는 Shift+스크롤로 화면 토글 ====== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        toggleStats();
      }
    };
    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        toggleStats();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStats]);

  const toggleStats = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowStats((v) => !v);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <Wrap style={{ minHeight }}>
      <ViewContainer $isVisible={!isTransitioning}>
        {!showStats ? (
          <>
            <TopBar ref={topbarRef}>
              <RoleBadge $inView={topbarInView}>
                <span>{roleLabel}</span>
              </RoleBadge>
              <NamePill $accent={accent} $inView={topbarInView} $delay="0.5s">
                <span>{smallName}</span>
              </NamePill>
            </TopBar>

            <Main>
              <BigTitle>
                <span>{bigTitle}</span>
              </BigTitle>
              <Divider $accent={accent} />
              <Body>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Body>
            </Main>

            <Silhouette src={silhouetteSrc} alt="" />
          </>
        ) : (
          <>
            <TopBar ref={topbarRef}>
              <RoleBadge $inView={topbarInView}>
                <span>{roleLabel}</span>
              </RoleBadge>
              <NamePill $accent={accent} $inView={topbarInView} $delay="0.12s">
                <span>{smallName}</span>
              </NamePill>
            </TopBar>

            {loading ? (
              <Loading>GitHub 데이터를 불러오는 중…</Loading>
            ) : (
              <GitHubStats
                repoCount={repoCount}
                languages={languages}
                stack={stack}
              />
            )}
          </>
        )}
      </ViewContainer>
    </Wrap>
  );
};

export default IntroSection;

/* =================== Styles =================== */
const fadeTransition = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideInFromLeft = css<{ $inView?: boolean; $delay?: string }>`
  will-change: transform, opacity;
  transition: opacity 1.3s ease-out ${(p) => p.$delay || "0s"},
    transform 1.3s cubic-bezier(0.22, 0.8, 0.26, 0.99)
      ${(p) => p.$delay || "0s"};
  opacity: ${(p) => (p.$inView ? 1 : 0)};
  transform: translateX(${(p) => (p.$inView ? "0" : "-28px")});
`;

const Wrap = styled.section`
  position: relative;
  background: url(${Background}) center/cover no-repeat;
  overflow: hidden;
  height: 100vh;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #323232 0%, #c9c9c9 100%);
    opacity: 0.8;
  }
`;

const ViewContainer = styled.div<{ $isVisible: boolean }>`
  position: relative;
  z-index: 1;
  opacity: ${(p) => (p.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const TopBar = styled.div`
  margin-top: 6%;
  padding: 32px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 960px) {
    padding: 40px 56px 0;
    gap: 10px;
  }
`;

const RoleBadge = styled.div<{ $inView?: boolean }>`
  margin-left: -60px;
  border-radius: 0 30px 30px 0;
  background: linear-gradient(
    90deg,
    rgba(130, 144, 108, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  ${slideInFromLeft};

  span {
    display: inline-block;
    color: #fff;
    padding: 30px 40px;
    font-family: "krafton";
    font-size: clamp(24px, 4vw, 48px);
    font-weight: 700;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
`;

const NamePill = styled.div<{
  $accent: string;
  $inView?: boolean;
  $delay?: string;
}>`
  margin-top: -25px;
  margin-left: -60px;
  width: 344px;
  height: 60px;
  border-radius: 0 30px 30px 0;
  background: linear-gradient(90deg, #5c7b73 0%, #000 100%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
  display: flex;
  align-items: center;

  ${slideInFromLeft};

  span {
    color: #fff;
    font-weight: 800;
    font-family: "krafton";
    margin-left: 15px;
    font-size: 40px;
    letter-spacing: 0.04em;
  }
`;

const Main = styled.div`
  margin-top: clamp(60px, 8vw, 120px);
  padding: 0 24px 120px;

  @media (min-width: 960px) {
    padding: 0 56px 160px;
  }
`;

const BigTitle = styled.div`
  margin-bottom: -20px;

  span {
    display: inline-block;
    background: #000;
    color: #fff;
    margin-left: -60px;
    width: 735px;
    padding: clamp(16px, 2.5vw, 24px) clamp(24px, 4vw, 40px);
    font-size: clamp(32px, 6vw, 64px);
    font-weight: 900;
    letter-spacing: -0.01em;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
  }
`;

const Divider = styled.hr<{ $accent: string }>`
  height: 2px;
  display: inline-block;
  border: none;
  background: linear-gradient(90deg, #fff 0%, #737373 100%);
  opacity: 0.5;
  margin: 0 0 clamp(24px, 4vw, 40px);
  width: 60%;
`;

const Body = styled.div`
  max-width: 900px;
  color: #fff;
  font-size: 23px;
  font-weight: 200;
  line-height: 1.7;

  p {
    margin: clamp(12px, 2vw, 20px) 0;
  }
`;

const Silhouette = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(40%); /* 아래로 내림 */
  width: min(35vw, 450px);
  height: auto;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`;

const Loading = styled.div`
  padding: 48px 56px;
  color: #fff;
  font-size: 20px;
  animation: ${fadeTransition} 0.6s ease;
`;
