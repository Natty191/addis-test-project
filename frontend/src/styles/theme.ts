import { Theme } from "theme-ui";

const theme: Theme = {
  // Color modes for light and dark themes

  colors: {
    text: "#000",
    background: "rgb(231,231,231)",
    lightgrey: "rgb(210,210,210)",
    grey: "rgb(76,76,76)",
    primary: "#33e",
    secondary: "#639",
    accent: "#f0c",
    muted: "#f6f6f6",
    modes: {
      dark: {
        text: "#fff",
        background: "rgb(24,24,24)",
        lightgrey: "rgb(40,40,40)",
        grey: "rgb(179,179,179)",
        primary: "#33e",
        secondary: "#9cf",
        accent: "#f3c",
        muted: "#111",
      },
    },
  },

  // Typography scale for consistent font sizes
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
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
  space: [0, 4, 8, 16, 32, 64, 128, 256],

  // Sizing scale for width, height, etc.
  sizes: {
    container: 1200,
    full: "100%",
  },

  // Responsive breakpoints
  breakpoints: ["40em", "52em", "64em"],
  mediaQueries: {
    small: "@media screen and (max-width: 40em)",
    medium: "@media screen and (min-width: 40em)",
    large: "@media screen and (min-width: 64em)",
  },

  // Shadows for depth and emphasis
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.12)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.16)",
    large: "0 10px 20px rgba(0, 0, 0, 0.19)",
  },

  // Radii for rounded corners
  radii: {
    small: 4,
    default: 8,
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
