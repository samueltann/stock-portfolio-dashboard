import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { logout } from "./utils/auth";
import { useNavigate } from "react-router-dom";
import SignInPrompt from "./components/SignInPrompt";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-slate-300">
        <Navbar />
        <div className="flex justify-end p-4">
          {user && (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Sign Out
            </button>
          )}
        </div>
        {user ? <Outlet /> : <SignInPrompt />}
      </div>
    </>
  );
}

export default App;
