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
    Icon,
    Button,
    Box,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { pages } from "@/util/pages";
import { FaGithub } from "react-icons/fa";
import { theme } from "@/util/theme";

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
}) => {
    const { pathname } = useRouter();
    const page = pages.find((p) => p.path === pathname);
    const filename = page
        ? page.path === "/"
            ? "pages/index.mdx"
            : `pages${page.path}.mdx`
        : "";

    return (
        <MDXProvider components={mdxComponents}>
            <Root>
                {filename && (
                    <EditButton
                        variant="link"
                        as="a"
                        href={`https://github.com/wbobeirne/webln-docs/edit/master/src/${filename}`}
                        target="_blank"
                        rightIcon={<Icon as={FaGithub} />}
                        size="sm"
                    >
                        <Box display={{ base: "none", md: "inline" }}>
                            Edit this page on GitHub
                        </Box>
                        <Box display={{ base: "inline", md: "none" }}>Edit</Box>
                    </EditButton>
                )}
                {children}
            </Root>
        </MDXProvider>
    );
};

const Root = styled.div`
    position: relative;

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

    .remark-highlight {
        margin-bottom: 1rem;

        pre {
            border: 1px solid var(--chakra-colors-chakra-border-color);
            border-radius: 4px;
        }
    }
`;

const EditButton = styled(Button)`
    position: absolute;
    top: 1rem;
    right: 0;

    ${theme.mq.md} {
    }
`;
