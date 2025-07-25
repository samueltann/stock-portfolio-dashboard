import { MdShowChart } from "react-icons/md";
import { Link } from "react-router-dom";
// import { logout } from "../utils/auth";

const Navbar = () => {
  return (
    <nav
      className={`p-4 bg bg-slate-400  mx-auto px-3 py-8 border-b-black border-b-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-4xl font-semibold">
          Stock Porfolio
          <MdShowChart className="float-left m-1" />
        </Link>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto 
                    md:space-x-4 absolute md:relative top-16 left-0 md:top-0 
                    md:left-0 p-4 md:p-0 bg-zinc-200 md:bg-transparent 
                    font-bold 
                   `}
        >
          <Link
            to="/"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            Search
          </Link>
          <Link
            to="/askAI"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            Ask AI
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
