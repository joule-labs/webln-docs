import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { requestProvider, GetInfoResponse } from "webln";
import { Alert } from "./Alert";
import { DemoContainer } from "./DemoContainer";
import styled from "@emotion/styled";

export const GetInfoDemo: React.FC = () => {
  const [info, setInfo] = useState<GetInfoResponse>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInfo = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setInfo(undefined);
    setError(undefined);

    setIsLoading(true);
    try {
      const webln = await requestProvider();
      const info = await webln.getInfo();
      setInfo(info);
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  };

  return (
    <DemoContainer componentFileName="GetInfoDemo.tsx">
      <Form onSubmit={handleGetInfo}>
        <FormControl>
          <FormLabel>Pubkey</FormLabel>
          <Input isDisabled value={info ? info.node.pubkey : ""} />
        </FormControl>
        <FormControl>
          <FormLabel>Alias</FormLabel>
          <Input isDisabled value={info ? info.node.alias : ""} />
        </FormControl>
        <FormControl>
          <FormLabel>Color</FormLabel>
          <Input
            isDisabled
            value={info ? info.node.color : ""}
            // addonBefore={
            //   info &&
            //   info.node.color && (
            //     <div
            //       style={{
            //         height: "1rem",
            //         width: "1rem",
            //         borderRadius: "100%",
            //         background: info.node.color,
            //       }}
            //     />
            //   )
            // }
          />
        </FormControl>
        {error && (
          <Alert
            status="error"
            title="An error occured"
            description={error.toString()}
          />
        )}
        <Button
          size="lg"
          isLoading={isLoading}
          onClick={handleGetInfo}
          width="100%"
        >
          Run webln.getInfo
        </Button>
      </Form>
    </DemoContainer>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
