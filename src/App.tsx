import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";

function App() {
  return (
    <div className="bg-custom-stale-secondary">
      <Navbar />

      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
