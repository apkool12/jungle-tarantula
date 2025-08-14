import React, { useRef } from "react";
import styled from "styled-components";

import Section1 from "../section/section1";
import Section2 from "../section/section2";
import Section3 from "../section/TeamIntro";
import Section4 from "../section/section4";

type MainPageProps = {
  children?: React.ReactNode;
};

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContainer ref={scrollRef}>
      <SectionWrap>
        <Section1 />
      </SectionWrap>

      <SectionWrap>
        <Section2 scrollRootRef={scrollRef} />
      </SectionWrap>

      <SectionWrap>
        <Section3 />
      </SectionWrap>

      <SectionWrap>
        <Section4 />
      </SectionWrap>
    </ScrollContainer>
  );
};

export default MainPage;

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionWrap = styled.section`
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
  position: relative;
`;
