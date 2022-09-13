import React, {useState} from "react";
import {IconProp, SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import ThemeSlider from "./theme-slider";
import {Transition} from "@headlessui/react";

interface INavbarItems {
    id: string;
    title: string;
}

interface IMediaLinks {
    link: string;
    icon: IconProp;
    name: string;
    title: string;
    size: SizeProp | undefined;
}

export default function Navbar({darkMode, setDarkMode}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const navbarItems: INavbarItems[] = [
        {id: "about", title: "About"},
        {id: "xp", title: "Experience"},
    ];

    const mediaLinks: IMediaLinks[] = [
        {
            link: "https://www.linkedin.com/in/knewby/",
            icon: ["fab", "linkedin"],
            name: "linkedin",
            title: "see my LinkedIn",
            size: "xl",
        },
        {
            link: "https://github.com/kolin-newby",
            icon: ["fab", "github"],
            name: "github",
            title: "see my Github",
            size: "xl",
        }
    ];

    const handleLinkClick = (e: any, path: any) => {
        e.preventDefault();
        router.push(path).catch(error => console.error(error));
    };

    function scrollTo(key: string) {
        let el = document.getElementById(key);
        el.scrollIntoView({behavior: "smooth"});
        setOpen(false);
    }
    return (
        <>
            <div className=" hidden small:flex z-20 w-40 h-screen flex-col justify-between transition-colors bg-gradient-to-b from-theme-light-1/70 to-theme-light-2/70 dark:from-theme-dark-1 dark:to-theme-dark-2">
                <a className={"flex flex-col items-center cursor-pointer h-max justify-center py-16 bg-black/70 dark:bg-white/70"} onClick={() => scrollTo("home")}>
                    <span className={"text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>K</span>
                </a>
                <div className={"flex flex-col items-center h-max justify-center"}>
                    {
                        navbarItems.map((item) => (
                            <a key={item.id + "-link"} onClick={() => scrollTo(item.id)} className={"group relative flex cursor-pointer w-32 text-xl font-bold justify-center items-center py-6"}>
                                {item.title}
                            </a>
                        ))
                    }
                </div>
                <div className={"flex flex-col justify-center items-center pb-10"}>
                    <div className={"flex justify-center items-center w-full space-x-3 mb-6 text-bg-dark dark:text-bg-light"}>
                        {
                            mediaLinks.map((link) => (
                                <a key={link.name + "-link"} className={"flex"} href={link.link} title={link.title} target={"_blank"}>
                                    <FontAwesomeIcon icon={link.icon} size={link.size}/>
                                </a>
                            ))
                        }
                    </div>
                    <ThemeSlider darkMode={darkMode} setDarkMode={setDarkMode}/>
                </div>
            </div>
            <div className="z-50 flex w-full relative small:hidden flex-col justify-between transition-colors bg-gradient-to-r from-theme-light-1/70 to-theme-light-2/70 dark:bg-bg-dark">
                <button onClick={() => setOpen(!open)} className={"z-50 h-20 w-20 absolute top-0 left-0 bg-gradient-to-t from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>
                    <FontAwesomeIcon size={"2xl"} className={"bg-clip-text text-bg-dark dark:text-bg-light"} icon={"bars"}/>
                </button>
                <a className={"flex z-10 relative flex-col items-center cursor-pointer h-20 justify-center bg-black dark:bg-white"} onClick={() => scrollTo("home")}>
                    <span className={"text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>K</span>
                </a>
                <Transition
                    show={open}
                    enter={"transform transition-all duration-200 ease-linear"}
                    enterFrom={"-translate-y-60"}
                    enterTo={"translate-y-0"}
                    leave={"transform transition-all duration-200 ease-linear"}
                    leaveFrom={"translate-y-0"}
                    leaveTo={"-translate-y-60"}
                    className={"absolute flex flex-col w-full top-20 bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}
                >
                    <div className={"flex flex-col items-center h-max justify-center"}>
                        {
                            navbarItems.map((item) => (
                                <a key={item.id + "-link"} onClick={() => scrollTo(item.id)} className={"group relative flex cursor-pointer w-32 text-xl font-bold justify-center items-center py-6"}>
                                    {item.title}
                                </a>
                            ))
                        }
                    </div>
                    <div className={"flex flex-col justify-center items-center my-4"}>
                        <div className={"flex items-center justify-between px-5 w-full"}>
                            <ThemeSlider darkMode={darkMode} setDarkMode={setDarkMode}/>
                            <div className={"flex justify-center items-center space-x-3 text-bg-dark dark:text-bg-light"}>
                                {
                                    mediaLinks.map((link) => (
                                        <a key={link.name + "-link"} className={"flex"} href={link.link} title={link.title} target={"_blank"}>
                                            <FontAwesomeIcon icon={link.icon} size={link.size}/>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    );
}
