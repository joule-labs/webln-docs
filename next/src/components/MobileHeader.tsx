import React, { useCallback, useEffect, useState } from "react";
import { Icon, Drawer } from "@chakra-ui/react";
import { VERSION } from "../util/constants";
import { SideMenu } from "./SideMenu";
import { useRouter } from "next/router";
// import "./MobileHeader.less";

export const MobileHeader: React.FC = () => {
  const { pathname } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Close drawer on resize
  useEffect(() => {
    window.addEventListener("resize", closeDrawer);
    return () => {
      window.removeEventListener("resize", closeDrawer);
    };
  }, [closeDrawer]);

  // Close drawer on navigate
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  return (
    <div className="MobileHeader">
      <Icon
        className="MobileHeader-open"
        type="menu-unfold"
        onClick={openDrawer}
      />
      <div className="MobileHeader-title">
        WebLN
        <div className="MobileHeader-title-version">v{VERSION}</div>
      </div>
      <Drawer
        // className="MobileHeader-drawer"
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="left"
        size="md"
      >
        <SideMenu />
      </Drawer>
    </div>
  );
};
