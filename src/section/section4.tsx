// src/pages/MainPage.tsx
import React from "react";
import styled, { keyframes } from "styled-components";
import Background from "../assets/svg/background.svg";

type MainPageProps = {
  children?: React.ReactNode;
};

const Section1: React.FC<MainPageProps> = ({ children }) => {
  return (
    <Container>
      <LogoWrapper>
        <TeamText>TEAM</TeamText>
        <Title>TARANTULA</Title>
      </LogoWrapper>
      {children}
    </Container>
  );
};

export default Section1;

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
  background: linear-gradient(180deg, #ffffff 0%, #000 50.94%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url(${Background}) repeat;
    opacity: 0.6;
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
