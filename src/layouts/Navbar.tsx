import Logo from "../assets/rigi_logo.svg";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 flex justify-between items-center w-full h-14 px-5 bg-custom-stale-primary border-custom-stale-primary-light border-y ">
      <a className=" flex align-middle p-2 rounded-lg h-10 cursor-pointer">
        <img src={Logo} className="w-16" />
      </a>

      <FaUserCircle className="text-gray-400 text-xl" />
    </nav>
  );
};

export default Navbar;
