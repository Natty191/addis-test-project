import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import AppLayout from "./layouts/AppLayout";
import { ThemeUIProvider } from "theme-ui";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
// import SongStatistics from './components/SongStatistics';

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <SongList />,
          },
          {
            path: "add-song",
            element: <AddSongForm />,
          },
          { path: "search", element: <SongList /> },
          { path: "search/:filter", element: <SongList /> },
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
