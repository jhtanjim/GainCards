// src/Layout/Main.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../Compnent/Sidebar/Sidebar";
import Header from "../Compnent/Header/Header";
import ScrollToTop from "../Compnent/ScrollToTop/ScrollToTop";

const Main = () => {
  return (
    <div className="flex h-screen w-full bg-[#FDF3F9]">
      <ScrollToTop />
      <Sidebar className="w-4" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto scrollbar-hidden" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;