import React from "react";
import { Icon, Button, Heading } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import styled from "@emotion/styled";
import { theme } from "@/util/theme";

interface Props {
  children: React.ReactNode;
  componentFileName: string;
  code?: string;
}

export const DemoContainer: React.FC<Props> = ({
  code,
  componentFileName,
  children,
}) => {
  return (
    <Root>
      <Header>
        <Title variant="md" as="h2">
          Demo
        </Title>
        <Button
          variant="link"
          as="a"
          href={`https://github.com/wbobeirne/webln-docs/tree/master/src/components/${componentFileName}`}
          target="_blank"
          rightIcon={<Icon as={FaGithub} />}
          size="sm"
        >
          See source on GitHub
        </Button>
      </Header>
      <Content>
        {code && <Code>{code}</Code>}
        <Demo>{children}</Demo>
      </Content>
    </Root>
  );
};

const Root = styled.div`
  margin-top: 3rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled(Heading)`
  flex: 1;
  margin: 0 !important;
`;

const Content = styled.div`
  display: flex;
  border: 1px solid var(--chakra-colors-chakra-border-color);
  border-radius: 4px;
  overflow: hidden;

  ${theme.mq.md} {
    flex-direction: column-reverse;
  }
`;

const Code = styled.pre`
  padding: 1rem;
  width: 360px;
  white-space: pre-wrap;
  border-right: 1px solid var(--chakra-colors-chakra-border-color);
  background: var(--prism-bg);
  color: var(--prism-text);
  text-shadow: 0 1px var(--prism-text-shadow);
  margin: 0;

  ${theme.mq.md} {
    width: auto;
    min-height: 60px;
    border-right: none;
    border-top: 1px solid var(--chakra-colors-chakra-border-color);
  }
`;

const Demo = styled.div`
  padding: 1rem;
  flex: 1;
  overflow: hidden;

  ${theme.mq.md} {
    flex-shrink: 0;
  }
`;
