import { MdShowChart } from "react-icons/md";

const Navbar = () => {
  return (
    // <div className="bg-slate-400  mx-auto px-3 py-8 border-b-black border-b-4">
    <nav
      className={`p-4 bg bg-slate-400  mx-auto px-3 py-8 border-b-black border-b-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <a href="/" className="text-4xl font-semibold">
          Stock Porfolio
          <MdShowChart className="float-left m-1" />
        </a>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto 
                    md:space-x-4 absolute md:relative top-16 left-0 md:top-0 
                    md:left-0 p-4 md:p-0 bg-zinc-200 md:bg-transparent 
                    font-bold 
                   `}
        >
          <a
            href="#home"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            Home
          </a>
          <a
            href="#about"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            Watchlist
          </a>
          <a
            href="#contact"
            className="block py-2 px-4 hover:text-gray-200 text-xl
                                   md:inline-block"
          >
            AI Overview
          </a>
        </div>
      </div>
    </nav>
    // </div>
  );
};

export default Navbar;
