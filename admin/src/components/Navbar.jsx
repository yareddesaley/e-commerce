import React from "react";
import Logo from "../assets/online-shopping.png";
import Profile from "../assets/women.jpg";
import Arrow_dowm from "../assets/arrow-down.png";
const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-between gap-10 md:gap-0 items-center">
        <div className=" flex gap-3 ml-20 items-center">
          <div>
            <img src={Logo} alt="logo" className="h-20" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Fashion</h1>
            <p className="text-lg text-red-500">Admin Panel</p>
          </div>
        </div>
        <div className="mr-20 flex gap-3 items-center">
          <img
            src={Profile}
            alt="profile"
            className="h-12 rounded-full bg-gray-300"
          />
          <img src={Arrow_dowm} alt="arrow down" className="h-12" />
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 w-full mt-4" />
    </div>
  );
};

export default Navbar;
