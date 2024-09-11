import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeUIProvider } from "theme-ui";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import AppLayout from "./layouts/AppLayout";
import AddSongPage from "./pages/AddSongPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthModal from "./components/AuthModal";

Modal.setAppElement("#root");

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            // <ProtectedRoute>
            <HomePage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "add-song",
          element: <AddSongPage />,
        },
        { path: "search", element: <SearchPage /> },
        { path: "search/:filter", element: <SearchPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ]);

  return (
    <ThemeUIProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer toastStyle={{ backgroundColor: "#131313" }} />
      <RouterProvider router={router} />
      <AuthModal />
    </ThemeUIProvider>
  );
}

export default App;
