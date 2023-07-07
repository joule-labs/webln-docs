import React from "react";
import { Menu, MenuGroup, MenuItem } from "@chakra-ui/react";
import Link from "next/link";
import { pages, sections } from "../util/menu";
import { VERSION } from "../util/constants";
import { useRouter } from "next/router";
// import "./SideMenu.less";

const allPageKeys = pages.map((p) => p.path);
const sectionsWithPages = sections.map((s) => ({
  ...s,
  pages: pages.filter((p) => p.section === s.id),
}));

export const SideMenu: React.FC = () => {
  const { pathname } = useRouter();
  const selectedKeys = allPageKeys.filter((key) => pathname == key);

  return (
    <div className="SideMenu">
      <div className="SideMenu-title">
        WebLN
        <div className="SideMenu-title-version">v{VERSION}</div>
      </div>
      <div className="SideMenu-menu">
        <Menu>
          {sectionsWithPages.map((s) => (
            <MenuGroup title={s.name} key={s.id}>
              {s.pages.map((p) => (
                <MenuItem key={p.path}>
                  <Link href={p.path}>{p.name}</Link>
                </MenuItem>
              ))}
              {!s.pages.length && (
                <div className="SideMenu-menu-empty">Coming soon!</div>
              )}
            </MenuGroup>
          ))}
        </Menu>
      </div>
      <div className="SideMenu-footer">
        <a
          href="https://github.com/wbobeirne/webln"
          target="_blank"
          rel="noopener nofollow"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/lightningjoule"
          target="_blank"
          rel="noopener nofollow"
        >
          Twitter
        </a>
        <a
          href="https://lightningjoule.com"
          target="_blank"
          rel="noopener nofollow"
        >
          Powered by Joule
        </a>
      </div>
    </div>
  );
};
