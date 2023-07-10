import React from "react";
import { Icon, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { pages } from "../util/menu";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

export const Navigation: React.FC = () => {
  const { pathname } = useRouter();
  const currentPage = pages.find((p) => p.path === pathname) || pages[0];
  const nextPage = pages[pages.indexOf(currentPage) + 1];
  const prevPage = pages[pages.indexOf(currentPage) - 1];

  return (
    <Root>
      <NavLink isPrev>
        {prevPage && (
          <Link href={prevPage.path}>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Icon as={FaArrowLeft} />}
            >
              Previous
            </Button>
          </Link>
        )}
      </NavLink>
      <NavLink isNext>
        {nextPage && (
          <Link href={nextPage.path}>
            <Button
              variant="outline"
              size="lg"
              rightIcon={<Icon as={FaArrowRight} />}
            >
              Next
            </Button>
          </Link>
        )}
      </NavLink>
    </Root>
  );
};

const Root = styled.div`
  padding-top: 3rem;
  display: flex;
`;

const NavLink = styled.div<{ isNext?: boolean; isPrev?: boolean }>`
  flex: 1;
  ${(props) => `text-align: ${props.isNext ? "right" : "left"};`}
`;

// .Navigation {
//   padding-top: 3rem;
//   display: flex;

//   &-link {
//     flex: 1;

//     &.is-prev {
//       text-align: left;
//     }

//     &.is-next {
//       text-align: right;
//     }
//   }
// }
