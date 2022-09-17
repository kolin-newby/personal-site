import './App.css';
import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar";
import {loadIcons} from "./config/iconLoader";
import useScript from "./components/script-loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer} from "recharts";
import PhotoCarousel from "./components/photo-carousel";
import Experience from "./components/exp";
import About from "./components/about";
import Contact from "./components/contact";

loadIcons();
export default function App() {
    useScript("cursor-effect.js");

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let mode = (document.cookie.split("=")[1] === "true");
        setDarkMode(mode);
    }, [])

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div id={"topDiv"} className={"flex small:flex-row flex-col overflow-hidden h-screen dark:text-white bg-bg-light dark:bg-bg-dark"}>
                <Navbar id={"nav"} darkMode={darkMode} setDarkMode={setDarkMode}/>
                <div className={"w-full overflow-y-auto overflow-x-hidden"}>
                    <div id={"home"} className={"relative w-full h-screen"}>
                        <div id={"wrapper relative h-full"}>
                            <canvas id={"canvas"} className={"absolute inset-0 z-10"}></canvas>
                            <div className={"absolute inset-0 z-20 flex flex-col text-5xl small:text-6xl largest:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
                                "items-center justify-center"}>
                                <span className={"flex"}>Hi, I'm Kolin.</span>
                                <span className={"flex"}>Software Developer</span>
                            </div>
                        </div>
                    </div>
                    <About/>
                    <Experience/>
                    <Contact/>
                </div>
            </div>
        </div>
    );
}

/*
TODO:
    - Make SVG icon for title
    - Add more to home page???
    - Add contact section maybe???
*/

