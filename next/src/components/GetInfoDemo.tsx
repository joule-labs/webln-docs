import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { requestProvider, GetInfoResponse } from "webln";

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
    <form onSubmit={handleGetInfo}>
      <FormControl>
        <FormLabel>Pubkey</FormLabel>
        <Input disabled value={info ? info.node.pubkey : ""} />
      </FormControl>
      <FormControl>
        <FormLabel>Alias</FormLabel>
        <Input disabled value={info ? info.node.alias : ""} />
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Input
          disabled
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
        <Alert status="error" style={{ marginBottom: "1rem" }}>
          <AlertIcon />
          <AlertTitle>An error occured</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
      <Button
        size="lg"
        isLoading={isLoading}
        onClick={handleGetInfo}
        width="100%"
      >
        Run webln.getInfo
      </Button>
    </form>
  );
};
