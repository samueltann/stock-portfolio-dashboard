import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { signInWithGoogle, logout } from "./utils/auth";

function App() {
  const { user } = useAuth();
  return (
    <>
      <div className="min-h-screen bg-slate-300 ">
        <Navbar />
        {user ? (
          <button onClick={logout}>Sign out</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
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
