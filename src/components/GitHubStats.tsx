// src/components/GitHubStats.tsx
import React from "react";
import styled from "styled-components";

type Lang = { lang: string; pct: number; color?: string };
type Props = {
  repoCount: number;
  languages: Lang[];
  stack?: string[];
};

const DEFAULT_COLORS: Record<string, string> = {
  Java: "#7FE175",
  Dart: "#4E5E4C",
  CSS: "#4C5E5D",
  HTML: "#B7DECE",
  "C++": "#6DC1DE", // ✅ 두 개의 # 버그 수정
  CMake: "#4C5E51",
  JavaScript: "#6DDE8A",
  Swift: "#4C5A5E",
};

const GitHubStats: React.FC<Props> = ({ repoCount, languages, stack }) => {
  const R = 120,
    CX = 150,
    CY = 150;
  let acc = 0;

  const segPath = (start: number, deg: number) => {
    const toXY = (a: number) => {
      const rad = ((a - 90) * Math.PI) / 180;
      return [CX + R * Math.cos(rad), CY + R * Math.sin(rad)];
    };
    const [x1, y1] = toXY(start);
    const [x2, y2] = toXY(start + deg);
    return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${
      deg > 180 ? 1 : 0
    } 1 ${x2} ${y2} Z`;
  };

  return (
    <Wrap>
      <Left>
        <svg width="600" height="600" viewBox="0 0 300 300">
          {languages.map((l, i) => {
            const deg = (l.pct / 100) * 360;
            const d = segPath(acc, deg);
            const fill = l.color || DEFAULT_COLORS[l.lang] || "#ffffff";
            acc += deg;
            return (
              <path
                key={i}
                d={d}
                fill={fill}
                stroke="rgba(0,0,0,.35)"
                strokeWidth="1"
              />
            );
          })}
          <circle
            cx={CX}
            cy={CY}
            r={80}
            fill="#6b7280"
            stroke="rgba(0,0,0,.35)"
            strokeWidth="1"
          />
        </svg>
      </Left>

      <Right>
        <Blocks>
          <Block style={{ width: 534, height: 112, left: 450, top: 110 }} />
          <Block style={{ width: 534, height: 112, left: 200, top: 202 }} />
          <Block style={{ width: 534, height: 112, left: 410, top: 270 }} />
          <Block style={{ width: 534, height: 112, left: 250, top: 300 }} />
        </Blocks>

        <StackWord>Stack</StackWord>
        <StackDivider />
        <StackDesc>{stack?.join(" , ") ?? ""}</StackDesc>
      </Right>

      <Legend>
        {languages.map((l) => (
          <LegendItem key={l.lang}>
            <ColorBox
              style={{
                background: l.color || DEFAULT_COLORS[l.lang] || "#6b7280",
              }}
            />
            <span>
              {l.lang} <small>({l.pct}%)</small>
            </span>
          </LegendItem>
        ))}
      </Legend>

      <RepoBadge>
        <span>REPO : {repoCount}</span>
      </RepoBadge>
    </Wrap>
  );
};

export default GitHubStats;

const Wrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: 40px;
  position: relative;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Right = styled.div`
  position: relative;
  min-height: 260px;
`;
const Blocks = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;
const Block = styled.div`
  position: absolute;
  background: #000;
  box-shadow: 0 0 6px 2px #fff;
  opacity: 0.98;
`;
const StackWord = styled.h2`
  position: relative;
  right: 10%;
  font-weight: 900;
  text-align: right;
  font-size: clamp(96px, 14vw, 200px);
  color: #fff;
  z-index: 1;
`;
const StackDivider = styled.hr`
  position: relative;
  bottom: 22%;
  width: 984px;
  height: 2px;
  border: 0;
  background: linear-gradient(90deg, #fff 0%, #9ca3af 100%);
  opacity: 0.35;
  margin: -50px 0 18px;
`;
const StackDesc = styled.p`
  position: relative;
  text-align: right;
  bottom: 15%;
  right: 10%;
  color: #fff;
  font-family: "Apple SD Gothic Neo";
  font-size: 50px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
`;
const RepoBadge = styled.div`
  position: absolute;
  left: 0;
  bottom: -10%;
  width: 300px;
  background: #fff;
  color: #737373;
  height: 56px;
  padding: 0 22px;
  border-radius: 0 24px 24px 0;
  display: inline-flex;
  align-items: center;

  span {
    font-size: 28px;
    font-weight: 500;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -100px;
  margin-left: 130px;
  gap: 12px 20px;

  small {
    opacity: 0.8;
    font-weight: 500;
    margin-left: 4px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  color: #fff;
`;

const ColorBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
`;
