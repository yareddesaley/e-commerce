import React from "react";
import LeftSIdeBar from "../components/LeftSIdeBar";
import Main from "../components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListItem from "../components/ListItem";
const Admin = () => {
  return (
    <div>
      <div>
        <div className="flex gap-5 ">
          <BrowserRouter>
            <div className="flex flex-col gap-2 md:flex md:flex-row md:gap-7 w-full">
              <LeftSIdeBar />

              <Routes>
                <Route path="/additem" element={<Main />} />
                <Route path="/itemlist" element={<ListItem />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default Admin;
