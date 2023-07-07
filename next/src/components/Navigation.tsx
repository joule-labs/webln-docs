import React from "react";
import { Icon, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { pages } from "../util/menu";
import "./Navigation.less";
import { useRouter } from "next/router";

export const Navigation: React.FC = () => {
  const { pathname } = useRouter();
  const currentPage = pages.find((p) => p.path === pathname) || pages[0];
  const nextPage = pages[pages.indexOf(currentPage) + 1];
  const prevPage = pages[pages.indexOf(currentPage) - 1];

  return (
    <div className="Navigation">
      <div className="Navigation-link is-prev">
        {prevPage && (
          <Link href={prevPage.path}>
            <Button variant="ghost" size="lg">
              <Icon as={FaArrowLeft} />
              Previous
            </Button>
          </Link>
        )}
      </div>
      <div className="Navigation-link is-next">
        {nextPage && (
          <Link href={nextPage.path}>
            <Button variant="ghost" size="lg">
              Next
              <Icon as={FaArrowRight} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
