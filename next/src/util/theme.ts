import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "orange" }),
  {
    breakpoints: {
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1200,
      "2xl": 1600,
    },
  }
);
