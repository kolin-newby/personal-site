import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { loadIcons } from "./config/iconLoader";
import useScript from "./components/script-loader";
import Experience from "./components/exp";
import About from "./components/about";
import Contact from "./components/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

loadIcons();
export default function App() {
  useScript("cursor-effect.js");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let mode = document.cookie.split("=")[1] === "true";
    setDarkMode(mode);
  }, []);

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className={"absolute z-10 bottom-0 right-0 w-20 h-20 bg-gray-600/30"}>
          <FontAwesomeIcon className="text-green text-6xl" icon={"node"}/>
        </div>
        <div
          id={"topDiv"}
          className={
            "flex lg:flex-row flex-col overflow-hidden h-screen dark:text-white bg-gradient-to-br from-[#ffa600] via-[#ff5a95] to-[#fd1d1d] dark:bg-bg-dark"
          }
        >
          <div className="absolute inset-0 bg-light-bg-image">
          <Navbar id={"nav"} darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <div className={"w-full overflow-y-auto overflow-x-hidden"}>
            <div id={"home"} className={"relative w-full h-screen"}>
              <div id={"wrapper relative h-full"}>
                <canvas
                  id={"homePage"}
                  className={"absolute inset-0 z-10"}
                ></canvas>
                <div
                  className={
                    "absolute inset-0 z-20 flex flex-col text-5xl lg:text-6xl 2xl:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
                    "items-center justify-center"
                  }
                >
                  <span className={"flex text-center"}>I'm Kolin,</span>
                  <div className={"writer-container"}>
                    <p className="writer">Climber</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <About /> */}
            {/* <Experience /> */}
            {/* <Portfolio /> */}
            {/* <Contact /> */}
          </div>
        </div>
      </div>
    </>
  );
}
