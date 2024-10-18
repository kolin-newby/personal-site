import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { loadIcons } from "./config/iconLoader";
import Experience from "./components/exp";
import About from "./components/about";
import Contact from "./components/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Social from "./components/social";
import useScript from "./components/script-loader";

loadIcons();

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    // function componentDidMount() {
    //     const script = document.createElement("script");
    //
    //     script.src = "/scripts/cursor-effect.js";
    //     script.async = true;
    //
    //     document.body.appendChild(script);
    // }
    //
    // componentDidMount();

    useEffect(() => {
        let mode = document.cookie.split("=")[1] === "true";
        setDarkMode(mode);
    }, []);

  return (
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className={"absolute inset-0 -z-10 bg-light-bg-image"}/>
        <div className={"absolute inset-0 -z-20 bg-gradient-to-br from-[#0059ff]/70 via-[#00a56a]/70 to-[#02e2e2]/70"}/>
        <div
            id={"topDiv"}
            className={
              "flex lg:flex-row flex-col overflow-hidden h-screen dark:text-white dark:bg-bg-dark"
            }
        >
          <Navbar id={"nav"} darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Social/>
          <div className={"w-full overflow-y-auto overflow-x-hidden"}>
            <div id={"home"} className={"relative w-full h-screen"}>
              <div id={"wrapper relative h-full"}>
                <canvas
                    id={"homePage"}
                    className={"absolute inset-0 z-10 dark:effect-color-light"}
                />
                <div
                    className={
                        "absolute inset-0 z-20 flex flex-col text-5xl lg:text-6xl 2xl:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
                        "items-center justify-center space-y-1"
                    }
                >
                  <span className={"flex text-center"}>Hi, I'm Kolin</span>
                  <span>
                    <a className="typewrite " data-period="2000"
                       data-store = '[ "Developer", "Climber", "Designer", "Backpacker", "Outdoor Enthusiast", "Software Engineer", "Amateur Photographer" ]'>
                      <span className="wrap"></span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <About/>
            {/* <Experience /> */}
            {/* <Portfolio /> */}
            {/* <Contact /> */}
          </div>
        </div>
      </div>
  );
}
