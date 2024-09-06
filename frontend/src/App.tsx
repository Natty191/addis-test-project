import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { ThemeUIProvider } from "theme-ui";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import HomePage from "./pages/HomePage";
import AddSongPage from "./pages/AddSongPage";
import SearchPage from "./pages/SearchPage";
// import SongStatistics from './components/SongStatistics';

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "add-song",
            element: <AddSongPage />,
          },
          { path: "search", element: <SearchPage /> },
          { path: "search/:filter", element: <SearchPage /> },
        ],
      },
    ]

    // createRoutesFromElements(
    //   <Route element={<AppLayout />}>
    //     <Route path="/" element={<SongList />} />
    //     <Route path="/add-song" element={<AddSongForm />} />
    //     {/* <Route path="/statistics" element={<SongStatistics />} /> */}
    //   </Route>
    // )
  );

  return (
    <ThemeUIProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeUIProvider>
  );
}

export default App;
