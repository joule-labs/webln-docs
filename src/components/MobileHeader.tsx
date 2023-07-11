import React, { useCallback, useEffect, useState } from "react";
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { VERSION } from "../util/constants";
import { SideMenu } from "./SideMenu";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { theme } from "@/util/theme";

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
    <Root>
      <OpenButton
        variant="ghost"
        onClick={openDrawer}
        icon={<AiOutlineMenuUnfold />}
        aria-label="Open menu"
        colorScheme="gray"
      />
      <Title>
        WebLN
        <Version>v{VERSION}</Version>
      </Title>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="left"
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SideMenu />
        </DrawerContent>
      </Drawer>
    </Root>
  );
};

const Root = styled.div`
  display: none;
  position: sticky;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 3.6rem;
  padding: 0 1rem;
  background: var(--chakra-colors-chakra-body-bg);
  box-shadow: 0 1px var(--chakra-colors-chakra-border-color);

  ${theme.mq.lg} {
    display: flex;
  }
`;

const OpenButton = styled(IconButton)`
  margin-right: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  font-size: 1.6rem;
  line-height: 1;
  align-items: flex-end;
`;

const Version = styled.div`
  padding-left: 8px;
  padding-bottom: 2px;
  font-size: 0.7rem;
`;
