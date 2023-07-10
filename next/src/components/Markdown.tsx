import React from "react";
import {
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";

const mdxComponents: React.ComponentProps<typeof MDXProvider>["components"] = {
  h1: (props) => <Heading {...props} size="xl" as="h1" />,
  h2: (props) => <Heading {...props} size="lg" as="h2" />,
  h3: (props) => <Heading {...props} size="md" as="h3" />,
  h4: (props) => <Heading {...props} size="sm" as="h4" />,
  p: Text,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  a: (props) => <ChakraLink {...props} color="primary.500" as={NextLink} />,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  td: Td,
  th: Th,
};

export const Markdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <MDXProvider components={mdxComponents}>
    <Root>{children}</Root>
  </MDXProvider>
);

const Root = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  h1 {
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 2rem;
  }

  h3 {
    margin-top: 1.5rem;
  }

  h4 {
    margin-top: 1rem;
  }

  h5 {
    margin-top: 0.5rem;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ul {
    padding-inline-start: 1.5rem;

    li {
      padding-bottom: 0.5rem;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p code,
  li code {
    font-size: 0.9rem;
    padding: 0.2rem 0.4rem;
    background: var(--prism-bg);
    border: 1px solid var(--chakra-colors-chakra-border-color);
    color: var(--prism-pink);
    border-radius: 4px;
  }

  .remark-highlight pre {
    border: 1px solid var(--chakra-colors-chakra-border-color);
    border-radius: 4px;
  }
`;
