import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { ThemeUIProvider } from "theme-ui";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import SongsList from "./pages/SongsList";
import AddSongForm from "./pages/AddSongForm";
import SearchResult from "./pages/SearchResult";
// import SongStatistics from './components/SongStatistics';

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <SongsList />,
          },
          {
            path: "add-song",
            element: <AddSongForm />,
          },
          { path: "search", element: <SearchResult /> },
          { path: "search/:filter", element: <SearchResult /> },
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
