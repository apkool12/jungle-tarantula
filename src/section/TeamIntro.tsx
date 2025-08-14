// src/pages/TeamIntro.tsx
import React, { useRef } from "react";
import IntroSection from "../components/IntroSection";

import People1 from "../assets/svg/people1.svg";
import People2 from "../assets/svg/people2.svg";
import People3 from "../assets/svg/people3.svg";

const members = [
  {
    roleLabel: "FRONT-END DEVELOPER",
    smallName: "WOO EUNSIK",
    bigTitle: "우은식입니다",
    paragraphs: [
      "안녕하세요 저는 국립한밭대학교에 재학중인 컴퓨터공학과 우은식이라고합니다.",
      "4일동안 팀원분들과 많은 얘기를하고 함께 개발하며 같이 성장하는 즐거움을 느끼고있습니다.",
      "여러분들과 함께하게되어 영광입니다. 남은 기간동안에도 잘 부탁드립니다.",
    ],
    silhouetteSrc: People1,
    accent: "#9EE37D",
    gitHubUsername: "apkool12", // GitHub 사용자명 추가
    stack: ["React", "TSX", "SCSS", "Styled-Component"], //
  },
  {
    roleLabel: "BACK-END DEVELOPER",
    smallName: "OH JUYEONG",
    bigTitle: "오주영",
    paragraphs: [
      "안녕하세요. 경기대학교 컴퓨터공학부 4학년 오주영입니다.",
      "Java와 Spring을 활용한 백엔드 개발에 집중하고 있으며, 함께 협업하면서 점점 더 호흡이 맞아가는 게 느껴져 기쁩니다.",
      "앞으로도 서로에게 힘이 되는 동료로, 즐겁게 프로젝트를 완성해 나가고 싶습니다.",
      "끝까지 멋지고 의미 있게 함께해요!",
    ],
    silhouetteSrc: People2,
    accent: "#8BD1FF",
    gitHubUsername: "wndudzz6",
    stack: ["Java", "Spring Boot", "JPA", "Kotlin"],
  },
  {
    roleLabel: "BACK-END DEVELOPER",
    smallName: "BAK YOUNGCHAN",
    bigTitle: "박영찬",
    paragraphs: [
      "안녕하세요 저는 경기대학교에 재학중인 컴퓨터공학부 박영찬이라고 합니다",
      "며칠간 함께 코드를 다루며 서로의 생각과 방식에 익숙해졌습니다.",
      "앞으로도 함께 고민하고 도전하며, 서로의 부족함을 채워 주는 든든한 동료가 되고 싶습니다.",
      "끝까지 즐겁게, 그리고 멋지게 완성해 나가요.",
    ],
    silhouetteSrc: People3,
    accent: "#F0B76E",
    gitHubUsername: "chupyum",
    stack: ["Python", "Flask"],
  },
];

const TeamIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 간단한 "다음 섹션으로" 스크롤
  const scrollToNext = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const sections = Array.from(el.querySelectorAll("section"));
    const next = sections[index + 1] as HTMLElement | undefined;
    next?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      style={{
        scrollSnapType: "y mandatory",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      {members.map((m, i) => (
        <div key={m.smallName} style={{ scrollSnapAlign: "start" }}>
          <IntroSection
            {...m}
            onNext={i < members.length - 1 ? () => scrollToNext(i) : undefined}
          />
        </div>
      ))}
      {/* 스크롤바 숨기고 스크롤 유지 */}
      <style>{`
        div[style*="overflow-y: auto"]::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </div>
  );
};

export default TeamIntro;
