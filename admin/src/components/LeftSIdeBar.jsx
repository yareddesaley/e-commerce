import React from "react";
import { Link } from "react-router-dom";

const LeftSIdeBar = () => {
  return (
    <div className="bg-white w-full h-48 md:w-1/4 md:h-screen flex flex-col items-center gap-5 ">
      <div className="border-2 border-gray-100 py-2  bg-gray-200 w-1/2  mt-8">
        <Link to={"/additem"}>
          <h1 className="flex justify-center">Add Product</h1>
        </Link>
      </div>
      <div className="border-2 border-gray-100 py-2 bg-gray-200 w-1/2  items-center">
        <Link to="/itemlist">
          <h1 className="flex justify-center">Product List</h1>
        </Link>
      </div>
    </div>
  );
};

export default LeftSIdeBar;
