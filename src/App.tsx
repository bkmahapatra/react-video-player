import "./App.css";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/RigiV001");
  }, []);

  return (
    <div className="bg-custom-stale-secondary relative">
      <Navbar />

      <div className="flex flex-col-reverse sm:flex-row">
        <Sidebar />

        <div className="md:flex-grow mt-14 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
