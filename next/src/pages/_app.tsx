import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import { MobileHeader } from "@/components/MobileHeader";
import { SideMenu } from "@/components/SideMenu";
import { theme } from "@/util/theme";
import { Navigation } from "@/components/Navigation";
import { Markdown } from "@/components/Markdown";
import "@/style/prism.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Root>
        <MobileHeader />
        <Sidebar>
          <SideMenu />
        </Sidebar>
        <Content>
          <Markdown>
            <Component {...pageProps} />
          </Markdown>
          <Navigation />
        </Content>
      </Root>
    </ChakraProvider>
  );
}

const Root = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;

  ${theme.mq.lg} {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  min-width: 300px;
  overflow: auto;
  overscroll-behavior: contain;

  ${theme.mq.lg} {
    display: none;
  }
`;

const Content = styled.div`
  padding: 1rem 2rem 3rem;
  width: 100%;
  max-width: 1280px;
`;
