import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Compnent/Sidebar/Sidebar";
import Header from "../Compnent/Header/Header";

const Main = () => {
  return (
    <div className="flex h-screen w-full ">
      <Sidebar className="w-4" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
