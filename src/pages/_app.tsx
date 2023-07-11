import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import { MobileHeader } from "@/components/MobileHeader";
import { SideMenu } from "@/components/SideMenu";
import { theme } from "@/util/theme";
import { Navigation } from "@/components/Navigation";
import { Markdown } from "@/components/Markdown";
import "@/style/prism.css";
import Head from "next/head";
import { pages } from "@/util/pages";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const page = pages.find((p) => p.path === pathname);
  console.log({ page });

  return (
    <>
      {page && (
        <Head>
          <title>{page.name} - WebLN</title>
          <meta name="description" content={page.description} />
          <meta name="og:title" content={`${page.name} - WebLN`} />
          <meta name="og:description" content={page.description} />
        </Head>
      )}
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
    </>
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
  max-width: 940px;
`;
