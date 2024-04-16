import "./App.css";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div className="bg-custom-stale-secondary relative">
      <Navbar />

      <div className="flex flex-col-reverse sm:flex-row">
        <Sidebar />

        <div className="md:flex-grow mt-14 p-3">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
