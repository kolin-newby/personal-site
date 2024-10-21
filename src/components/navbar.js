import React, { useState } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  // const [open, setOpen] = useState(false);

  const navbarItems = [
    { id: "about", title: "About" },
    // { id: "xp", title: "Experience" },
    // {id: "port", title: "Portfolio"},
    { id: "contact", title: "Contact" },
  ];

  function scrollTo(key) {
    let el = document.getElementById(key);
    el.scrollIntoView({ behavior: "smooth" });
    // setOpen(false);
  }
  return (
    <div className="absolute flex top-0 z-20 w-full justify-between items-center h-20">
        <button
          className={
            "group flex items-center cursor-pointer h-max justify-center"
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
        <div className={"flex items-center h-max justify-center space-x-14"}>
          {navbarItems.map((item) => (
            <button
              key={item.id + "-link"}
              onClick={() => scrollTo(item.id)}
              className={
                "group relative flex cursor-pointer text-xl font-bold justify-center items-center py-3 my-3 px-4 " +
                "rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-xl hover:bg-white/10"
              }
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className={"flex justify-center items-center mx-4"}>
          {/*<ThemeSlider darkMode={darkMode} setDarkMode={setDarkMode} />*/}
        </div>
      </div>
  );
}
