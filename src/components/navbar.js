import React from "react";
import {IconProp, SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import ThemeSlider from "./theme-slider";

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
        el.scrollIntoView();
    }

    return (
        <div className="z-20 flex w-40 h-screen flex-col justify-between transition-colors bg-gradient-to-b from-theme-light-1/70 to-theme-light-2/70 dark:bg-bg-dark">
            <a className={"flex flex-col items-center h-max justify-center py-16 bg-black/70 dark:bg-white/70"} href={"home"}>
                <span className={"text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-theme-light-1 to-theme-light-2"}>K</span>
            </a>
            <div className={"flex flex-col items-center h-max justify-center"}>
                {
                    navbarItems.map((item) => (
                        <a key={item.id + "-link"} onClick={() => scrollTo(item.id)} className={"group relative flex cursor-pointer w-32 text-lg justify-center items-center py-6"}>
                            {item.title}
                            <div className={"absolute -z-10 inset-y-0 -inset-x-3 transform transition-transform duration-300 -translate-x-40 group-hover:-translate-x-0 bg-gray-200"}/>
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
    );
}
