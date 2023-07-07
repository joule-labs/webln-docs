import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { requestProvider } from "webln";

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
    <form>
      <Flex gap={20}>
        <div>
          <FormControl>
            <FormLabel>Signature</FormLabel>
            <Textarea
              name="message"
              rows={5}
              value={message}
              onChange={(ev) => setMessage(ev.currentTarget.value)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl>
            <FormLabel>Signature</FormLabel>
            <Textarea
              name="signature"
              rows={5}
              value={signature}
              onChange={(ev) => setSignature(ev.currentTarget.value)}
            />
          </FormControl>
        </div>
      </Flex>
      {error && (
        <Alert status="error" style={{ marginBottom: "1rem" }}>
          <AlertIcon />
          <AlertTitle>An error occured</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
      <Button
        size="lg"
        isLoading={isLoading}
        onClick={verifyMessage}
        width="100%"
      >
        Verify message
      </Button>
    </form>
  );
};
