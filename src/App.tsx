import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { signInWithGoogle, logout } from "./utils/auth";

function App() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <div className="min-h-screen bg-slate-300 ">
          <Navbar />
          <button onClick={logout}>Sign out</button>
          <Outlet />
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </>
  );
}

export default App;
