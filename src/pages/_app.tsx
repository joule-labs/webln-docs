import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import { MobileHeader } from "@/components/MobileHeader";
import { SideMenu } from "@/components/SideMenu";
import { theme } from "@/util/theme";
import { Navigation } from "@/components/Navigation";
import { Markdown } from "@/components/Markdown";
import Head from "next/head";
import { pages } from "@/util/pages";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@/style/prism.css";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname, replace } = useRouter();
  const page = pages.find((p) => p.path === pathname);

  // The old docs site used a hash router, so we need to redirect
  // now that it's a path router.
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash
      .replace("#", "")
      .replace("/api", "/client");
    const hashPage = pages.find((p) => p.path === hash);
    if (hashPage) {
      replace(hashPage.path);
    }
  }, [pathname, replace]);

  return (
    <>
      {page && (
        <Head>
          <title>{`${page.name} - WebLN Documentation`}</title>
          <meta name="description" content={page.description} />
          <meta
            name="og:title"
            content={`${page.name} - WebLN Documentation`}
          />
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
  flex: 1;
  min-width: 0;
  max-width: 940px;
`;
