import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Stars from "../assets/svg/background.svg";
import Foliage from "../assets/svg/foliage.svg";
import Number8 from "../assets/svg/number8.svg";

type Props = {
  scrollRootRef?: React.RefObject<HTMLDivElement | null>;
};

const Section2: React.FC<Props> = ({ scrollRootRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [svgVisible, setSvgVisible] = useState(false);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (animationTriggered) return;

        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setAnimationTriggered(true);
          setTextVisible(true);

          setTimeout(() => {
            setSvgVisible(true);
            setTimeout(() => {
              setRotate(true);
            }, 600);
          }, 800);
        }
      },
      {
        root: scrollRootRef?.current || null,
        threshold: [0.3],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [scrollRootRef, animationTriggered]);

  return (
    <Wrap ref={sectionRef}>
      <Inner>
        <Kicker $visible={textVisible}>무한하게, 성장하는</Kicker>
        <SvgWrap $visible={svgVisible} $rotate={rotate}>
          <img src={Number8} alt="Number 8 with divider" />
        </SvgWrap>
      </Inner>
    </Wrap>
  );
};

export default Section2;

/* -------- animations -------- */
const fadeUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(40px);
  }
  to   { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

const rotateAndGlow = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.1));
  }
  100% {
    transform: translateY(0) rotate(90deg);
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.6));
  }
`;

/* -------- styles -------- */
const Wrap = styled.section`
  position: relative;
  max-height: 100vh;
  background: linear-gradient(180deg, #000 0%, #272727 39.9%, #565656 100%);
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  &::before {
    background: url(${Stars}) repeat center top / auto;
    opacity: 0.4;
  }
  &::after {
    background: url(${Foliage}) no-repeat center bottom / contain;
    opacity: 1;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  padding: 2rem;
`;

const Kicker = styled.p<{ $visible: boolean }>`
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-family: "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.05em;
  font-size: clamp(20px, 2.5vw, 32px);
  opacity: 0;
  transform: translateY(40px);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeUp} 1s ease-out forwards;
    `}
`;

const SvgWrap = styled.div<{ $visible: boolean; $rotate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  opacity: 0;
  transform: translateY(40px);

  img {
    width: clamp(240px, 20vw, 460px);
    height: auto;
    display: block;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.1));
  }

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeUp} 0.8s ease-out forwards;
    `}

  ${({ $visible, $rotate }) =>
    $visible &&
    $rotate &&
    css`
      animation: ${fadeUp} 0.8s ease-out forwards,
        ${rotateAndGlow} 2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.8s forwards,
        ${pulseGlow} 3s ease-in-out infinite 2.8s;
    `}
`;
