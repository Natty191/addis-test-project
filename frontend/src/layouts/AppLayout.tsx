import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <header>
        <h1>Music Library</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
