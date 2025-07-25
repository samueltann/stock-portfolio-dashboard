import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { logout } from "./utils/auth";

import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-slate-300">
        <Navbar />
        <div className="flex justify-end p-4">
          {user ? (
            <button
              onClick={logout}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;

// {/* Sign Out Button */}
// <button
//   onClick={logout}
//   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-l"
// >
//   Sign Out
// </button>
