import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyles, theme } from "./lib/style";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyles />
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
