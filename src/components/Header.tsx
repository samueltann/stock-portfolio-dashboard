import { MdShowChart } from "react-icons/md";

function Header() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Stock Portfolio
          <MdShowChart className="float-left m-1" />
        </h1>
        <p className="text-slate-400 text-lg">
          Track your investments and monitor market performance
        </p>
      </div>
    </>
  );
}

export default Header;
