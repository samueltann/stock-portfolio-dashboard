import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdShowChart } from "react-icons/md";

const SignUpPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to homepage after successful signup
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
        console.error("Signup failed:", error.message);
      } else {
        setErrorMsg("Signup failed. Please try again.");
        console.error("Signup failed:", error);
      }
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
          Create an account
        </h3>

        {errorMsg && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
