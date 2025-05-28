import { RiStockLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className={`bg-slate-300 p-4 bg`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <a href="/" className="text-4xl font-semibold">
          Stock Porfolio
          <RiStockLine className="float-left m-1" />
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
            className="block py-2 px-4 hover:text-gray-200 border-2 border-amber-500
                                   md:inline-block"
          >
            Home
          </a>
          <a
            href="#about"
            className="block py-2 px-4 hover:text-gray-200
                                   md:inline-block"
          >
            Watchlist
          </a>
          <a
            href="#contact"
            className="block py-2 px-4 hover:text-gray-200 
                                   md:inline-block"
          >
            AI Overview
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
