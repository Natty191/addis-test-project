import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        /* transition: background-color 0.3s, border 0.3s; */
        transition: background-color 0.3s;
      }

      html {
        font-size: 62.5%;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        /* background-color: rgb(24, 24, 24); */
        /* background-color: rgb(32, 32, 32); */
        font-size: 1.6rem;

        overflow-y: hidden;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
        color: inherit;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        cursor: pointer;
        background: none;
        border: none;
      }

      *:disabled {
        cursor: not-allowed;
      }

      ul {
        list-style: none;
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
        hyphens: auto;
      }

      img {
        max-width: 100%;
      }

      ::-webkit-scrollbar {
        width: 0.5em;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        /* background: rgb(40, 40, 40); */
        background-image: linear-gradient(
          rgba(160, 160, 160, 0.2),
          rgba(160, 160, 160, 0.2)
        );
      }
      input:-webkit-autofill {
        background-color: rgba(180, 180, 180, 0.3);
      }
    `}
  />
);

export default GlobalStyles;
