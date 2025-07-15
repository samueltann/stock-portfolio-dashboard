import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-300 ">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
