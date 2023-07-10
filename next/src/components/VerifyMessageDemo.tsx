import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { requestProvider } from "webln";
import styled from "@emotion/styled";
import { Alert } from "./Alert";
import { DemoContainer } from "./DemoContainer";

export const VerifyMessageDemo: React.FC = () => {
  const [message, setMessage] = useState("WebLN is the bee's knees");
  const [signature, setSignature] = useState(
    "rbpr1o6qfqtgrsqmnhgsq7tkch9aet5ze7wstxqjo87zqybg38tzy3pmiwi36c5mcqnnep179dhjziog5jsam41ce7hdaf4dmjfhiys9"
  );
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const verifyMessage = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const webln = await requestProvider();
      await webln.verifyMessage(signature, message);
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  };

  return (
    <DemoContainer componentFileName="VerifyMessageDemo.tsx">
      <Form>
        <Flex gap={4}>
          <Box flex={1}>
            <FormControl>
              <FormLabel>Signature</FormLabel>
              <Textarea
                name="message"
                rows={5}
                value={message}
                onChange={(ev) => setMessage(ev.currentTarget.value)}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl>
              <FormLabel>Signature</FormLabel>
              <Textarea
                name="signature"
                rows={5}
                value={signature}
                onChange={(ev) => setSignature(ev.currentTarget.value)}
              />
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
          onClick={verifyMessage}
          width="100%"
        >
          Verify message
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
