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
        {id: "about", title: "XP"},
        {id: "/contact", title: "Contact"},
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

    return (
        <div className="group absolute transition-colors bg-transparent hover:bg-gray-200/50 top-0 inset-x-0 flex justify-between h-24 z-20">
            <div className={"flex flex-row justify-center w-full items-center space-x-20"}>
                    <span className={"flex"}>
                      <a key={"home"} onClick={(e) => handleLinkClick(e, "/")}
                         className={"flex text-2xl transition-all cursor-pointer z-10"}>
                        <span className={"flex"}>About</span>
                      </a>
                    </span>
                {navbarItems.map(({path, title}) => (
                    <span key={"navLink-" + path} className={"flex"}>
                          <a
                              className="flex text-2xl transition-all cursor-pointer z-10"
                              onClick={(e) => handleLinkClick(e, path)}
                          >
                            {title}
                          </a>
                        </span>
                ))}
            </div>
            <span className={"flex flex-row space-x-4 items-center justify-center mr-8"}>{
                mediaLinks.map(({link, icon, name, title, size}) => (
                    <div key={"social-link-" + name} className={"flex relative cursor-pointer"}>
                        <a href={link} target={"_blank"} rel={"noreferrer"} className={"flex"} title={title}>
                            <FontAwesomeIcon icon={icon} className={"z-10"} size={size}/>
                        </a>
                    </div>
                ))
            }</span>
        </div>
    );
}
