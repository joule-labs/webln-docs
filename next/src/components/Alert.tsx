import React from "react";
import {
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
  AlertStatus,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  status: AlertStatus;
  title: React.ReactNode;
} & ({ description: React.ReactNode } | { children: React.ReactNode });

export const Alert: React.FC<Props> = ({ status, title, ...props }) => {
  return (
    <ChakraAlert status={status} alignItems="flex-start" borderRadius={4}>
      <ChakraAlertIcon />
      <AlertContent>
        <ChakraAlertTitle>{title}</ChakraAlertTitle>
        <ChakraAlertDescription>
          {"children" in props ? props.children : props.description}
        </ChakraAlertDescription>
      </AlertContent>
    </ChakraAlert>
  );
};

const AlertContent = styled.div`
  p {
    margin: auto;
  }
`;
