import { createGlobalStyle } from "styled-components";
import KRAFTON from "../src/assets/fonts/KRAFTON_FONTWindow.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "KRAFTON";
    src: local('KRAFTON'), local('KRAFTON');
    font-style: normal;
    src: url(${KRAFTON}) format('truetype');
  }

  html, body {
    -ms-overflow-style: none;   /* IE/Edge */
    scrollbar-width: none;      /* Firefox */
    scroll-behavior: smooth;    /* 스크롤 전환 부드럽게 */
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;              /* Chrome/Safari */
  }
`;