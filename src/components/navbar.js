import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeSlider from "./theme-slider";
import { Transition } from "@headlessui/react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  const navbarItems = [
    { id: "about", title: "About" },
    { id: "xp", title: "Experience" },
    // {id: "port", title: "Portfolio"},
    { id: "contact", title: "Contact" },
  ];

  const mediaLinks = [
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
    },
    {
        link: "/Kolin-Newby-resume.pdf",
        icon: "file-lines",
        name: "resume",
        title: "See my resume",
        size: "xl",

    }
  ];

  function scrollTo(key) {
    let el = document.getElementById(key);
    el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }
  return (
    <div className="sticky flex top-0 z-20 w-full justify-between">
        <button
          className={
            "group flex items-center cursor-pointer h-max justify-center bg-black/70 dark:bg-white/70"
          }
          onClick={() => scrollTo("home")}
        >
          <span
            className={
              "text-6xl font-extrabold bg-clip-text py-2"
            }
          >
            {"{kn}"}
          </span>
        </button>
        <div className={"flex items-center h-max justify-center"}>
          {navbarItems.map((item) => (
            <button
              key={item.id + "-link"}
              onClick={() => scrollTo(item.id)}
              className={
                "group relative flex cursor-pointer w-32 " +
                "text-xl font-bold justify-center items-center py-6 " +
                "transition-colors duration-300 hover:bg-gray-200 hover:bg-opacity-20 " +
                "rounded"
              }
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className={"flex justify-center items-center space-y-5"}>
          <ThemeSlider darkMode={darkMode} setDarkMode={setDarkMode} />
          <div
            className={
              "flex justify-center items-center w-full space-x-5 mb-6 text-bg-dark dark:text-bg-light"
            }
          >
            {mediaLinks.map((link) => (
              <a
                key={link.name + "-link"}
                className={
                  "flex transition-transform transform scale-100 hover:scale-125"
                }
                href={link.link}
                title={link.title}
                target={"_blank"}
                rel={"noreferrer"}
              >
                <FontAwesomeIcon icon={link.icon} size={link.size} />
              </a>
            ))}
          </div>
        </div>
      </div>
  );
}
