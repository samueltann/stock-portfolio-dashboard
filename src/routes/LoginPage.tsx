import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { MdShowChart } from "react-icons/md";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      console.error("Login failed:", error.message);
      setErrorMsg("Invalid username / password");
    } else {
      console.error("Login failed:", error);
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full border-4 border-slate-600">
        <div className="flex items-center justify-center mb-6">
          <MdShowChart className="text-4xl text-slate-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">Stock Portfolio</h2>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-center">
          Sign in to continue
        </h3>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <div className="space-y-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3"
          />
          <button
            onClick={handleEmailSignIn}
            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition"
          >
            Sign in with Email
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-3 px-6 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleAnonymousSignIn}
            className="text-sm text-slate-600 underline hover:text-slate-800"
          >
            Continue as Guest
          </button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-slate-600 underline hover:text-slate-800"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
