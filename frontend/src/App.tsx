import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import AppLayout from "./layouts/AppLayout";
// import SongStatistics from './components/SongStatistics';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
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
    <div>
      <RouterProvider router={router} />

      {/* <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<SongList />} />
            <Route path="/add-song" element={<AddSongForm />} />
          </Route>
        </Routes>
      </Router> */}
    </div>
  );

  // return <RouterProvider router={router} />;
}

export default App;
