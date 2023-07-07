import "../style/prism.css";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import { MobileHeader } from "../components/MobileHeader";
import { SideMenu } from "../components/SideMenu";
import { theme } from "../util/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Root>
        <MobileHeader />
        <Sidebar>
          <SideMenu />
        </Sidebar>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Root>
    </ChakraProvider>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: center;
`;

const Sidebar = styled.div`
  height: 100vh;
  overflow: auto;
  min-width: 300px;
`;

const Content = styled.div`
  flex: 1;
  height: 100vh;
  overflow: auto;
  padding: 1rem 2rem 3rem;
  max-width: 1280px;
`;

// .App {
//   display: flex;
//   justify-content: center;

//   &-sidebar,
//   &-content {
//     height: 100vh;
//     overflow: auto;
//   }

//   &-sidebar {
//     min-width: 300px;
//   }

//   &-content {
//     flex: 1;
//     padding: 1rem 2rem 3rem;
//     max-width: 1280px;
//   }

//   @media @md-query {
//     &-sidebar {
//       display: none;
//     }

//     &-content {
//       padding-top: @mobile-header-height + 1rem;
//       padding-bottom: 2rem;
//     }
//   }
// }
