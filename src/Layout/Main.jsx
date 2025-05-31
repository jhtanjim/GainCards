import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Compnent/Sidebar/Sidebar";
import Header from "../Compnent/Header/Header";
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
const Main = () => {
    const lenisRef = useRef()
 useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time)
    }
  
    const rafId = requestAnimationFrame(update)
  
    return () => cancelAnimationFrame(rafId)
  }, [])
  
  return (
        // <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} >

    <div  className="flex h-screen w-full bg-[#FDF3F9]">
      <Sidebar className="w-4" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
    // <ReactLenis/>
  );
};

export default Main;
