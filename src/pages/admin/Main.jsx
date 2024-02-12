import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MenuBar from "./MenuBar";

function Main() {
  
  return (
    <div className="">
      <div className="grid grid-cols-6">
        <div className="col-span-1 min-h-[100vh] p-4 font-bold text-white bg-[#111c43]">
            <MenuBar/>
        </div>
        <div className="col-span-5">
          <Header />
          <div className="min-h-[85vh] p-2">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
