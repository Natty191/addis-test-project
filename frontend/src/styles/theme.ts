import { Theme } from "theme-ui";

const theme: Theme = {
  // Color modes for light and dark themes

  colors: {
    text: "#fff",
    background: "rgb(8,8,8)",
    darkgrey: "rgb(13,13,13)",
    grey: "rgb(22,22,22)",
    lightgrey: "rgb(37,37,37)",
    lightergrey: "rgb(130,130,130)",
    lightestgrey: "rgb(200,200,200)",
    primary: "#1ed760",
    secondary: "#9cf",
    accent: "#f3c",
    muted: "#111",
    modes: {
      light: {
        text: "#000",
        background: "rgb(221,221,221)",
        darkgrey: "rgb(214,214,214)",
        grey: "rgb(200,200,200)",
        lightgrey: "rgb(218,218,218)",
        lightergrey: "rgb(70,70,70)",
        lightestgrey: "rgb(35,35,35)",
        // primary: "#33e",
        secondary: "#639",
        accent: "#f0c",
        muted: "#f6f6f6",
      },
    },
  },

  // Typography scale for consistent font sizes
  fonts: {
    body: 'system-ui, sans-serif, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "Georgia, serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 15, 16, 18, 24, 32, 48, 64, 72], // Responsive font sizes
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },

  // Space scale for margins and paddings
  space: [
    "0rem",
    "0.4rem",
    "0.8rem",
    "1.6rem",
    "3.2rem",
    "6.4rem",
    "12.8rem",
    "25.6rem",
  ],

  // Sizing scale for width, height, etc.
  sizes: {
    container: 1200,
    full: "100%",
  },

  // Responsive breakpoints
  breakpoints: ["40em", "65em", "80em"],
  mediaQueries: {
    small: "@media screen and (max-width: 40em)",
    medium: "@media screen and (min-width: 40em)",
    large: "@media screen and (min-width: 64em)",
  },

  // Shadows for depth and emphasis
  shadows: {
    small: "0px 0px 8px rgba(0, 0, 0, 0.1)",
    medium: "0 2px 6px rgba(0, 0, 0, 0.16)",
    large: "0 10px 20px rgba(0, 0, 0, 0.19)",
  },

  // Radii for rounded corners
  radii: {
    small: 4,
    default: 6,
    large: 16,
    full: "50%",
  },

  // Z-Index for layering elements
  zIndices: {
    dropdown: 1000,
    modal: 1100,
    overlay: 1200,
    tooltip: 1300,
  },

  // Transitions for animations
  transitions: {
    default: "0.2s ease-in-out",
    fast: "0.1s ease-in-out",
  },

  // Buttons style variants
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "secondary",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },

  // Links style variants
  links: {
    nav: {
      fontSize: 2,
      fontWeight: "bold",
      display: "block",
      p: 2,
      color: "primary",
      textDecoration: "none",
      "&:hover": {
        color: "secondary",
      },
    },
  },
};

export default theme;
