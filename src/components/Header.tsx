import React from "react";
import styled from "styled-components";
import SpiderIcon from "../assets/svg/spider.svg";

type HeaderProps = {
  titleMain?: string;
  titleSub?: string;
  spiderSrc?: string;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({
  titleMain = "JUNGLE",
  titleSub = "TARANTULA",
  spiderSrc = SpiderIcon,
  className,
}) => {
  return (
    <Bar className={className}>
      <Inner>
        <Left>
          <MainTitle>{titleMain}</MainTitle>
          <SubTitle>{titleSub}</SubTitle>
        </Left>
        <Right>
          <Spider src={spiderSrc} alt="spider" />
        </Right>
      </Inner>
    </Bar>
  );
};

export default Header;

const Bar = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: linear-gradient(90deg, #000 0%, #627b54 100%);
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.2);

  padding: 12px 20px;

  position: relative;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  line-height: 1;
`;

const MainTitle = styled.h1`
  margin: 0;
  letter-spacing: 4px;
  font-size: 38px;
  font-family: "KRAFTON";
  color: #ffffff;
`;

const SubTitle = styled.span`
  letter-spacing: 3px;
  font-family: "KRAFTON";
  margin-left: 43px;
  color: #e9efe6;
  font-size: 15px;
`;

const Right = styled.div`
  display: flex;
  margin-right: 5%;
  align-items: center;
`;

const Spider = styled.img`
  width: clamp(28px, 3.6vw, 40px);
  height: auto;
`;
