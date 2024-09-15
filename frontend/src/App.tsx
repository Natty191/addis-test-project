import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useColorMode } from "theme-ui";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import AppLayout from "./layouts/AppLayout";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthModal from "./components/AuthModal";
import MySongsPage from "./pages/MySongsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ArtistsPage from "./pages/ArtistsPage";
import AlbumsPage from "./pages/AlbumsPage";
import SongsPage from "./pages/SongsPage";

Modal.setAppElement("#root");

function App() {
  const [colorMode] = useColorMode();

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "my-songs",
          element: (
            <ProtectedRoute>
              <MySongsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "favorites",
          element: (
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          ),
        },
        { path: "search", element: <SearchPage /> },
        { path: "search/:filter", element: <SearchPage /> },
        { path: "artists", element: <ArtistsPage /> },
        { path: "albums", element: <AlbumsPage /> },
        { path: "songs", element: <SongsPage /> },
      ],
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        toastStyle={{
          backgroundColor: colorMode === "light" ? "#e9e9e9" : "#131313",
          color: colorMode === "light" ? "#414141" : "#d1d1d1",
        }}
      />
      <RouterProvider router={router} />
      <AuthModal />
    </>
  );
}

export default App;
