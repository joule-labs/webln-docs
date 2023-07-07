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
import { requestProvider, SignMessageResponse } from "webln";

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
    <form>
      <Flex gap={20}>
        <div>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea rows={5} value={message} onChange={handleChangeMessage} />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel>Signature</FormLabel>
            <Textarea rows={5} disabled value={sig ? sig.signature : ""} />
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
        onClick={signMessage}
        width="100%"
      >
        Sign message
      </Button>
    </form>
  );
};
