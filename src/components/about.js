import PhotoCarousel from "./photo-carousel";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About({className=""}) {

    const skills1 = [
        {title:"Golang", icon:"fa-brands fa-golang"},
        {title:"JavaScript", icon:"fa-brands fa-js"},
        {title:"React", icon:"fa-brands fa-react"},
        {title:"Python", icon:"fa-brands fa-python"},
        {title:"HTML5", icon:"fa-brands fa-html5"},
    ];
    const skills2 = [
        {title:"CSS3", icon:"fa-brands fa-css3"},
        {title:"Git", icon:"fa-brands fa-git-alt"},
        {title:"Docker", icon:"fa-brands fa-docker"},
        {title:"Java", icon:"fa-brands fa-java"},
        {title:"Linux", icon:"fa-brands fa-linux"},
    ];
    const skills3 = [
        {title:"Hubspot", icon:"fa-brands fa-hubspot"},
        {title:"Ubuntu", icon:"fa-brands fa-ubuntu"},
        {title:"Github", icon:"fa-brands fa-github"},
        {title:"Confluence", icon:"fa-brands fa-confluence"},
        {title:"Bash", icon:"fa-solid fa-terminal"},
    ];

    return(
        <div id={"about"} className={`relative flex h-screen items-center ${className}`}>
            <div className={"flex flex-col items-center h-full w-1/2 justify-center"}>
                <div className={"flex items-center justify-center w-full h-1/2"}>
                    <div className={"flex w-3/5 rounded-sm bg-gradient-to-br from-orange-500 via-purple-400 to-red-400 shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"}>
                        <span className={"flex bg-gray-200 rounded-sm w-full h-full m-0.5 px-3 py-2"}>
                            I love creating things and seeing the world from new perspectives. Besides software development, my passion is in photography and the great outdoors!<br/><br/>
                            I have built robust, data-driven UIs using React.js and developed API logging software using Golang. My experience spans the full stack and I am eager to keep learning and growing my skills!
                        </span>
                    </div>
                </div>
                <div className={"flex w-full h-1/2 items-center justify-center"}>
                    <div className={"grid grid-rows-3 gap-8 w-2/3 h-3/4 text-black/40"}>
                        <div key={"skills-row-1"} className={"flex row-span-1 w-full h-full overflow-hidden"}>
                            <div key={"skills-r1-1"} className={"scroll-left-container-start-1"}>
                                {skills1.map((skill, index) => (
                                    <>
                                        <div key={`skills1-first-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                            <div key={"skills-r1-2"} className={"scroll-left-container-end-1"}>
                                {skills1.map((skill, index) => (
                                    <>
                                        <div key={`skills1-second-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                        </div>
                        <div key={"skills-row-2"} className={"flex row-span-1 w-full h-full justify-end overflow-hidden"}>
                            <div key={"skills-r2-1"} className={"scroll-right-container-end"}>
                                {skills2.map((skill, index) => (
                                    <>
                                        <div key={`skills2-first-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                            <div key={"skills-r2-2"} className={"scroll-right-container-start"}>
                                {skills2.map((skill, index) => (
                                    <>
                                        <div key={`skills2-second-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                        </div>
                        <div key={"skills-row-3"} className={"flex row-span-1 w-full h-full overflow-hidden"}>
                            <div key={"skills-r3-1"} className={"scroll-left-container-start-2"}>
                                {skills3.map((skill, index) => (
                                    <>
                                        <div key={`skills3-first-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                            <div key={"skills-r3-2"} className={"scroll-left-container-end-2"}>
                                {skills3.map((skill, index) => (
                                    <>
                                        <div key={`skills3-second-${index}`} className={"flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"}>
                                            <FontAwesomeIcon className={"absolute inset-0 w-full h-full"}
                                                             icon={skill.icon}/>
                                            <span className={"text-transparent"}>{skill.title}</span>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PhotoCarousel/>
        </div>
    )
}
