import { useNavigate } from "react-router-dom";

function SignInPrompt() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.779.735 6.879 1.992M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-slate-500">Sign in to access your portfolio.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignInPrompt;
