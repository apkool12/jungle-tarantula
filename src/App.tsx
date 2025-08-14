// src/App.tsx
import React from "react";
import MainPage from "./page/MainPage"; // 확장자 생략 권장
import Header from "./components/Header";

import { GlobalStyle } from "./global";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainPage />
    </>
  );
}

export default App;
