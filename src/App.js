import './App.css';
import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar";
import {loadIcons} from "./config/iconLoader";
import useScript from "./components/script-loader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer} from "recharts";

loadIcons();
export default function App() {
    useScript("cursor-effect.js");

    const [darkMode, setDarkMode] = useState(false);

    const skills = [
        {name: "ReactJS", level: "75%", levelNum: 75},
        {name: "Front-End", level: "85%", levelNum: 85},
        {name: "TypeScript", level: "80%", levelNum: 80},
        {name: "Node.js", level: "75%", levelNum: 75},
        {name: "Back-End", level: "55%", levelNum: 55},
    ]

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div id={"topDiv"} className={"flex small:flex-row flex-col overflow-hidden h-screen dark:text-white bg-bg-light dark:bg-bg-dark"}>
                <Navbar id={"nav"} darkMode={darkMode} setDarkMode={setDarkMode}/>
                <div className={"w-full overflow-y-auto overflow-x-hidden"}>
                    <div id={"home"} className={"relative w-full h-screen"}>
                        <div id={"wrapper relative h-full"}>
                            <canvas id={"canvas"} className={"absolute inset-0 z-10"}></canvas>
                            <div className={"absolute inset-0 z-20 flex flex-col text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
                                "items-center justify-center"}>
                                <span className={"flex"}>Hey, I'm Kolin.</span>
                                <span className={"flex"}>Software Developer</span>
                            </div>
                        </div>
                    </div>
                    <div id={"xp"} className={"flex h-screen items-center"}>
                        <div className={"flex flex-col largest:flex-row items-center h-full w-full"}>
                            <div className={"flex shrink flex-col largest:w-[37.5%] justify-center px-10 largest:mb-0 mb-10"}>
                                <span
                                    className={"flex largest:text-6xl text-5xl mt-5 largest:mt-0 justify-center font-extrabold pb-20"}
                                >
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>M</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>y</span>
                                    &nbsp;
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>E</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>x</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>p</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>e</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>r</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>i</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>e</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>n</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>c</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>e</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>.</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>.</span>
                                    <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                        "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                        "from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>.</span>
                                </span>
                                <span className={"text-2xl pb-8"}>
                                    Since starting my career, I've done contract work and worked remotely with startups.
                                    I have collaborated with brilliant folks from across the world to create robust software systems.
                                </span>
                                <span className={"text-2xl pb-8"}>
                                    I have established skills in both front-end and back-end development,
                                    though currently I primarily work in front-end.
                                    I have developed a intuitive, powerful UI and built and supported open source,
                                    low-latency web loggers.
                                </span>
                                <span className={"text-2xl"}>
                                    For more details, feel free to check out my <a href={"https://www.linkedin.com/in/knewby/"} target={"_blank"} className={"bg-clip-text text-transparent bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>Linkedin</a>!
                                </span>
                            </div>
                            <div className={"hidden largest:flex shadow-2xl dark:shadow-blue-900 hover:shadow-lg rounded-lg " +
                                "bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2 " +
                                "w-[37.5%] h-4/6 transition-all p-[8px] hover:p-[5px] mr-3"}>
                                <div className={"flex items-end justify-evenly space-y-10 p-8 rounded-lg bg-bg-light " +
                                    "dark:bg-bg-dark w-full"}>
                                    {
                                        skills.sort((a, b) => {
                                            if (a.level > b.level) return 1;
                                            if (b.level > a.level) return -1;
                                            return 0;
                                        }).map((skill) => (
                                            <div key={"skill-"+skill.name} className={"flex flex-col h-full w-full items-center"}>
                                                <div className={"flex bg-gray-200 dark:bg-gray-800/70 rounded-full items-end " +
                                                    "w-5 h-full"}>
                                                    <div className={`flex rounded-full w-5 bg-theme-light-2/90 dark:bg-theme-light-1/80`} style={{height: skill.level}}/>
                                                </div>
                                                <span className={"flex h-5 text-center text-xl mt-8 items-center justify-center font-bold"}>{skill.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={"flex flex-col largest:w-1/4 px-6 space-y-8"}>
                                <div className={"flex flex-col smallest:flex-row items-center justify-center"}>
                                    <div className={"flex w-96 h-96 items-center justify-center largest:hidden box-content " +
                                        "smallest:shadow-2xl dark:shadow-blue-900 largest:hover:shadow-lg rounded-lg " +
                                        "bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 " +
                                        "dark:to-theme-dark-2 transition-all smallest:p-[5px] largest:p-[8px] " +
                                        "largest:hover:p-[5px] mr-3"}>
                                        <div className={"flex largest:hidden relative items-center justify-center rounded-lg " +
                                            "bg-bg-light dark:bg-bg-dark h-full w-full"}>
                                            <ResponsiveContainer
                                                width={390}
                                                aspect={1}
                                                className={"flex"}
                                            >
                                                <RadarChart outerRadius={90} width={730} height={250} data={skills}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="name" stroke={darkMode ? "white" : "black"} tickLine={false} axisLine={false} tickSize={8}/>
                                                    <Radar name="skills" dataKey="levelNum" stroke={"#f5154e"} fill={"#f5154e"} fillOpacity={0.65} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col space-y-8 largest:px-0 smallest:pl-6"}>
                                        <a
                                            href={"https://www.colorado.edu/cs/academics/undergraduate-programs/bachelor-science#software_engineering-755"}
                                            target={"_blank"}
                                            className={"flex flex-col largest:h-1/3 p-5 justify-center items-center " +
                                                "rounded-lg transition-all transform hover:-translate-y-1 shadow-lg " +
                                                "dark:shadow-blue-900 hover:shadow-2xl bg-gradient-to-r " +
                                                "from-theme-light-1/50 to-theme-light-2/70 dark:from-theme-dark-1/50 " +
                                                "dark:to-theme-dark-2/70"}
                                        >
                                            <span className={"flex text-center largest:text-2xl font-bold pb-4"}>B.S. Computer Science</span>
                                            <span className={"flex text-center largest:text-xl"}>CU Boulder</span>
                                            <span className={"flex text-center largest:text-lg pb-4"}>2017-2021</span>
                                            <span className={"flex text-center largest:text-base"}>A degree in Computer Science with a focus on Software Development and a minor in Business</span>
                                        </a>
                                        <a href={"https://resurface.io"} target={"_blank"} className={"flex flex-col largest:h-1/3 " +
                                            "p-5 justify-center items-center rounded-lg transition-all transform hover:-translate-y-1 " +
                                            "shadow-lg dark:shadow-blue-900 hover:shadow-2xl bg-gradient-to-r " +
                                            "from-theme-light-1/50 to-theme-light-2/70 dark:from-theme-dark-1/50 " +
                                            "dark:to-theme-dark-2/70"}>
                                            <span className={"flex text-center largest:text-2xl font-bold pb-4"}>Software Engineer</span>
                                            <span className={"flex text-center largest:text-xl"}>Resurface Labs</span>
                                            <span className={"flex text-center largest:text-lg pb-4"}>2021-Present</span>
                                            <span className={"flex text-center largest:text-base"}>A cyber security startup focused on data-driven API security</span>
                                        </a>
                                    </div>
                                </div>
                                <div className={"flex flex-col largest:h-1/3 p-5 justify-center " +
                                    "items-center rounded-lg transition-all transform hover:-translate-y-1 " +
                                    "shadow-lg dark:shadow-blue-900 hover:shadow-2xl bg-gradient-to-r " +
                                    "from-theme-light-1/50 to-theme-light-2/70 dark:from-theme-dark-1/50 " +
                                    "dark:to-theme-dark-2/70"}>
                                    <span className={"flex text-center largest:text-2xl font-bold"}>Interested in learning more?</span>
                                    <span className={"flex text-center largest:text-xl"}>
                                        Download my resume
                                        <button className={"px-2 hover:animate-pulse"}>
                                            <FontAwesomeIcon icon={"download"} className={"drop-shadow-lg"}/>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
