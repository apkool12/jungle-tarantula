import React from "react";
import styled, { keyframes } from "styled-components";
import SpiderIcon from "../assets/svg/spider.svg";
import Background from "../assets/svg/background.svg";

type MainPageProps = {
  children?: React.ReactNode;
};

const Section1: React.FC<MainPageProps> = ({ children }) => {
  return (
    <Container>
      <LogoWrapper>
        <Spider src={SpiderIcon} alt="Spider Icon" />
        <TeamText>TEAM</TeamText>
        <Title>TARANTULA</Title>
        <Subtitle>Krafton JUNGLE</Subtitle>
      </LogoWrapper>
      {children}
    </Container>
  );
};

export default Section1;

const glitch = keyframes`
  0%, 100% {
    text-shadow: 2px 0 rgba(155,155,155,0.3), -1px 0 rgba(54,199,235,0.3);
  }
  10% {
    text-shadow: -1px -1px rgba(155,155,155,0.3), 2px 1px rgba(54,199,235,0.3);
  }
  20% {
    text-shadow: 2px 1px rgba(155,155,155,0.3), -1px -1px rgba(54,199,235,0.3);
  }
  30% {
    text-shadow: -1px 0 rgba(155,155,155,0.3), 2px 0 rgba(54,199,235,0.3);
  }
  40% {
    text-shadow: 2px -1px rgba(155,155,155,0.3), -1px 1px rgba(54,199,235,0.3);
  }
  50% {
    text-shadow: -1px 1px rgba(155,155,155,0.3), 2px -1px rgba(54,199,235,0.3);
  }
  60% {
    text-shadow: 2px 0 rgba(155,155,155,0.3), -1px 0 rgba(54,199,235,0.3);
  }
  70% {
    text-shadow: -1px -1px rgba(155,155,155,0.3), 2px 1px rgba(54,199,235,0.3);
  }
  80% {
    text-shadow: 2px 1px rgba(155,155,155,0.3), -1px -1px rgba(54,199,235,0.3);
  }
  90% {
    text-shadow: -1px 0 rgba(155,155,155,0.3), 2px 0 rgba(54,199,235,0.3);
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(${Background}) repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: black;
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url(${Background}) repeat;
    opacity: 0.8;
    background-size: cover;
    z-index: 0;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.7s ease-out;
`;

const Spider = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  z-index: 0;
`;

const TeamText = styled.h2`
  margin-bottom: 0px;
  text-align: center;
  font-family: KRAFTON;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(89deg, #82906c 3.3%, #5c7b73 89.62%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

const Title = styled.h1`
  margin-top: 0px;
  text-align: center;
  font-family: KRAFTON;
  font-size: 140px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(89deg, #627b54 3.3%, #fff 89.62%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

const Subtitle = styled.p`
  text-align: center;
  font-family: KRAFTON;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.817) 1.86%,
    #000 98.14%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;
