import PhotoCarousel from "./photo-carousel";
import React from "react";

export default function About() {
    const title = "About_Me..."

    return(
        <div id={"about"} className={"flex flex-col 2xl:flex-row flex-grow min-h-screen items-center justify-center"}>
            <div className={"flex flex-col text-lg lg:text-xl 2xl:text-2xl space-y-6 2xl:w-1/2 pt-5 px-10"}>
                <span
                    className={"flex 2xl:text-6xl sm:text-5xl text-4xl mt-5 2xl:mt-0 justify-center font-extrabold lg:pb-14 pb-5"}
                >
                        {title.split("").map((letter, index) => (
                            <span key={"about-title-" + letter + index} className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                `from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2 ${letter === "_" ? "invisible" : "visible"}`}>{letter}</span>
                        ))}
                </span>
                <span className={"flex sm:px-5"}>
                    As a Coloradan, I enjoy hiking, backpacking, and photography, feel free to check out some of my favorite shots!
                    I love the outdoors and I aspire to make a positive impact on the world the only way I know how,
                    with code!
                </span>
                <span className={"flex sm:px-5"}>
                    I completed my undergraduate degree at CU Boulder. For two years now I've worked at Resurface Labs, a small startup in API security.
                    Resurface has been a great place for me to grow my knowledge and to learn new skills, I'm still learning something new every day!
                </span>
            </div>
            <div className={"flex lg:w-1/2 w-full h-96 mt-6 2xl:mt-0 2xl:h-auto 2xl:pr-10"}>
                <PhotoCarousel/>
            </div>
        </div>
    )
}
