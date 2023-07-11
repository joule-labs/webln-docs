import React from "react";
import { Icon } from "@chakra-ui/react";
import { FaFrown } from "react-icons/fa";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export const Placeholder: React.FC<Props> = ({ children }) => (
  <Root>
    <Icon as={FaFrown} />
    <div>{children}</div>
  </Root>
);

const Root = styled.div`
  margin: 2rem 0 0;
  padding: 3rem 2rem;
  border: 2px dashed var(--chakra-colors-dividerLight);
  color: var(--chakra-colors-chakra-subtle-text);
  border-radius: 8px;
  text-align: center;
`;
