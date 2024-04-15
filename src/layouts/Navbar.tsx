import React from "react";
import Logo from "../assets/rigi_logo.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between align-middle w-full h-14 px-5 bg-custom-stale-primary border-custom-stale-primary-light border-y ">
      {/* <a className="bg-stone-100 flex align-middle p-2 rounded-lg h-10`"> */}
        <img src={Logo} className="w-16" />
      {/* </a> */}
    </nav>
  );
};

export default Navbar;
