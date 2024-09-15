import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ThemeUIProvider } from "theme-ui";
import theme from "./styles/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeUIProvider theme={theme}>
      <App />
    </ThemeUIProvider>
    </Provider>
  </StrictMode>
);
