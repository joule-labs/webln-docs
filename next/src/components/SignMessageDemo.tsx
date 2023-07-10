import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { requestProvider, SignMessageResponse } from "webln";
import { Alert } from "./Alert";
import styled from "@emotion/styled";
import { DemoContainer } from "./DemoContainer";

export const SignMessageDemo = () => {
  const [message, setMessage] = useState<string>("WebLN is the bee's knees");
  const [sig, setSig] = useState<SignMessageResponse>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeMessage = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(ev.target.value);
    setSig(undefined);
  };

  const signMessage = async () => {
    setError(undefined);
    setSig(undefined);
    setIsLoading(true);

    try {
      const webln = await requestProvider();
      const sig = await webln.signMessage(message);
      setSig(sig);
    } catch (error) {
      setError(error as Error);
    }

    setIsLoading(false);
  };

  return (
    <DemoContainer componentFileName="SignMessageDemo.tsx">
      <Form>
        <Flex gap={4}>
          <Box flex={1}>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                rows={5}
                value={message}
                onChange={handleChangeMessage}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormLabel>Signature</FormLabel>
              <Textarea rows={5} isDisabled value={sig ? sig.signature : ""} />
            </FormControl>
          </Box>
        </Flex>
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
          onClick={signMessage}
          width="100%"
        >
          Sign message
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
