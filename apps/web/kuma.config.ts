import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: {
      100: "red",
    },
    blue: "blue",
  },
  breakpoints: {
    xs: "320px",
    sm: "480px",
    md: "760px",
    lg: "960px",
    xl: "1200px",
    xxl: "1600px",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
