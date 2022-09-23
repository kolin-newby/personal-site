import PhotoCarousel from "./photo-carousel";
import React from "react";

export default function About() {
    const title = "About_Me..."

    return(
        <div id={"about"} className={"flex flex-col 2xl:flex-row flex-grow min-h-screen items-center"}>
            <div className={"flex flex-col text-lg lg:text-xl 2xl:text-2xl space-y-6 2xl:w-1/2 pt-5 px-10"}>
                <span
                    className={"flex 2xl:text-6xl sm:text-5xl text-4xl mt-5 2xl:mt-0 justify-center font-extrabold lg:pb-20 pb-5"}
                >
                        {title.split("").map((letter) => (
                            <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                `from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2 ${letter === "_" ? "invisible" : "visible"}`}>{letter}</span>
                        ))}
                </span>
                <span className={"flex sm:px-10"}>I'm a developer early in his career, living in Colorado, USA. Outside of my work, I have passions for hiking, backpacking, and photography. Feel free to check out some of my favorite photos!
                                I love the outdoors and I aspire to make a positive impact on our planet's current climate crisis the only way I know how, with code.</span>
                <span className={"flex sm:px-10"}>I got my undergraduate degree in Computer Science at CU Boulder and I went from there to working on a web logger written in the Go programming language, this project was open-source so
                                check out my github if you're interested! I moved on to a front-end environment that uses React and Node.js to display massive amounts of searchable, detailed
                                API request and response data collected by loggers like the Go logger I mentioned earlier. </span>
                <span className={"flex sm:px-10"}>I really enjoy doing personal projects like making Python web bots and computer vision scanners for scanning board game pieces.
                                Recently, I have been trying my hand in the vast world of game development using C++ and SFML to recreate some of the classics.</span>
            </div>
            <div className={"flex lg:w-1/2 w-full h-96 mt-6 2xl:mt-0 2xl:h-auto 2xl:pr-10"}>
                <PhotoCarousel/>
            </div>
        </div>
    )
}
