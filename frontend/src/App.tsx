import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useColorMode } from "theme-ui";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthModal from "./components/AuthModal";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MySongsPage = lazy(() => import("./pages/MySongsPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ArtistsPage = lazy(() => import("./pages/ArtistsPage"));
const AlbumsPage = lazy(() => import("./pages/AlbumsPage"));
const SongsPage = lazy(() => import("./pages/SongsPage"));

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
