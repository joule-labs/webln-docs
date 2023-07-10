import React from "react";
import { Link as ChakraLink, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { pages, sections } from "../util/pages";
import { VERSION } from "../util/constants";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { theme } from "@/util/theme";

const sectionsWithPages = sections.map((s) => ({
  ...s,
  pages: pages.filter((p) => p.section === s.id),
}));

export const SideMenu: React.FC = () => {
  const { pathname } = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Root>
      <Title>
        WebLN
        <Version>v{VERSION}</Version>
      </Title>
      <Menu>
        {sectionsWithPages.map((s) => (
          <MenuGroup key={s.id}>
            <MenuGroupTitle>{s.name}</MenuGroupTitle>
            {!!s.pages.length && (
              <MenuGroupItems>
                {s.pages.map((p) => (
                  <MenuItem
                    key={p.path}
                    as={NextLink}
                    href={p.path}
                    isActive={p.path === pathname}
                    isDark={isDark}
                  >
                    {p.name}
                  </MenuItem>
                ))}
              </MenuGroupItems>
            )}
            {!s.pages.length && <Empty>Coming soon!</Empty>}
          </MenuGroup>
        ))}
      </Menu>
      <Footer>
        <ChakraLink
          href="https://github.com/wbobeirne/webln"
          target="_blank"
          rel="noopener nofollow"
        >
          GitHub
        </ChakraLink>
        <ChakraLink as="button" onClick={toggleColorMode}>
          Toggle theme
        </ChakraLink>
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--chakra-colors-chakra-subtle-bg);
`;

const Title = styled.div`
  padding: 20px 24px 40px;
  display: flex;
  font-size: 1.3rem;
  line-height: 1;
  align-items: flex-end;
  color: var(--chakra-colors-headingColor);
`;

const Version = styled.div`
  padding-left: 8px;
  padding-bottom: 2px;
  font-size: 0.7rem;
  color: var(--chakra-colors-chakra-subtle-text);
`;

const Menu = styled.div`
  flex: 1;
`;

const MenuGroup = styled.div`
  margin-bottom: 2rem;
`;

const MenuGroupTitle = styled.div`
  padding: 0.5rem;
  padding-left: 1.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.08rem;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--chakra-colors-headingColor);
`;

const MenuGroupItems = styled.div``;

const MenuItem = styled(ChakraLink)<{ isActive: boolean; isDark: boolean }>`
  display: block;
  padding: 0.8rem;
  padding-left: 1.5rem;
  font-size: 0.875rem;

  ${({ isActive, isDark }) =>
    isActive &&
    `
    background-color: ${
      isDark ? theme.colors.primary[900] : theme.colors.primary[50]
    };
    color: ${theme.colors.primary[500]};
    border-right: 3px solid ${theme.colors.primary[500]};
  `}
`;

const Empty = styled.div`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  padding: 2rem 1.5rem;
  color: var(--chakra-colors-chakra-subtle-text);
  border: 1px dashed var(--chakra-colors-dividerLight);
  border-radius: 4px;
  text-align: center;
`;

const Footer = styled.footer`
  padding: 0 0 0.5rem;
  text-align: center;
  color: var(--chakra-colors-chakra-subtle-text);

  a,
  button {
    padding: 0.4rem 0.6rem;
    color: var(--chakra-colors-chakra-subtle-text);
    opacity: 0.5;
    font-size: 0.7rem;

    &:hover {
      color: ${theme.colors.primary[500]};
      opacity: 1;
      cursor: pointer;
    }
  }
`;
