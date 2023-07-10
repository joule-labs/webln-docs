import {
  extendTheme,
  withDefaultColorScheme,
  theme as defaultTheme,
} from "@chakra-ui/react";

const breakpoints = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1600,
};

const mq = Object.entries(breakpoints).reduce(
  (prev, [size, width]) => {
    prev[size as keyof typeof breakpoints] = `@media (max-width: ${width}px)`;
    return prev;
  },
  {} as Record<keyof typeof breakpoints, string>
);

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "primary" }),
  withDefaultColorScheme({ colorScheme: "gray", components: ["Table"] }),
  {
    breakpoints,
    mq,
    colors: {
      primary: {
        50: "#fff9f0",
        100: "#ffe7ba",
        200: "#ffd591",
        300: "#ffc069",
        400: "#ffa940",
        500: "#fa8c16",
        600: "#d46b08",
        700: "#ad4e00",
        800: "#873800",
        900: "#612500",
      },
    },
    fonts: {
      heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
      body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
    },
    semanticTokens: {
      colors: {
        dividerLight: {
          default: defaultTheme.colors.blackAlpha[200],
          _dark: defaultTheme.colors.whiteAlpha[200],
        },
        headingColor: {
          default: "blackAlpha.900",
          _dark: "rgba(255, 255, 255, 0.9)",
        },
      },
    },
    components: {
      Heading: {
        baseStyle: {
          color: "var(--chakra-colors-headingColor)",
          _dark: {
            color: "var(--chakra-colors-headingColor)",
          },
        },
        sizes: {
          xl: {
            fontSize: "2rem",
            lineHeight: "1.5",
          },
          lg: {
            fontSize: "1.5rem",
            lineHeight: "1.5",
          },
          md: {
            fontSize: "1.175rem",
            lineHeight: "1.5",
          },
          sm: {
            fontSize: "1.1rem",
            lineHeight: "1.5",
          },
        },
      },
    },
    styles: {
      global: {
        html: {
          textRendering: "auto",
          "-webkit-font-smoothing": "auto",
        },
        body: {
          bg: "white",
          color: "blackAlpha.700",
          _dark: {
            bg: "gray.800",
            color: "whiteAlpha.800",
          },
        },
      },
    },
  }
);
