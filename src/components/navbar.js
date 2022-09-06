import React from "react";
import {IconProp, SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";

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

export default function Navbar() {
    const router = useRouter();

    const navbarItems: INavbarItems[] = [
        {id: "about", title: "About"},
        {id: "xp", title: "Contact"},
    ];

    const mediaLinks: IMediaLinks[] = [
        {
            link: "https://www.linkedin.com/in/knewby/",
            icon: ["fab", "linkedin"],
            name: "linkedin",
            title: "see my LinkedIn",
            size: "lg",
        },
        {
            link: "https://github.com/kolin-newby",
            icon: ["fab", "github"],
            name: "github",
            title: "see my Github",
            size: "lg",
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
        <div className=" z-20 flex w-40 h-screen flex-col transition-colors bg-gradient-to-b from-theme-light-1 to-theme-light-2 dark:bg-bg-dark">
            <div className={"flex flex-col divide-y-2 divide-bg-dark dark:divide-bg-light items-center h-full justify-center"}>
                {
                    navbarItems.map((item) => (
                        <a key={item.id + "-link"} onClick={() => scrollTo(item.id)} className={"flex cursor-pointer text-lg justify-center items-center py-10 hover:py-12 hover:text-xl transition-all duration-300"}>
                            {item.title}
                        </a>
                    ))
                }
            </div>
        </div>
    );
}
