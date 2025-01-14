import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Navbar({ darkMode, setDarkMode, scrollPosition, touch }) {
  const [active, setActive] = React.useState("home");
  const [barOpen, setBarOpen] = React.useState(false);

  const navbarItems = [
    {id: "home", title: "Home", icon:"home"},
    {id: "about", title: "About", icon:"user"},
    {id: "work", title: "Work", icon:"briefcase"},
    {id: "contact", title: "Contact", icon:"walkie-talkie"},
  ];

  function scrollTo(key) {
    let el = document.getElementById(key);
    el.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (active && ["home", "about", "work", "contact"].includes(active)) {
      scrollTo(active);
    }
  }, [active]);

  return (
    <div className={"group/bar fixed z-50 items-start justify-start flex top-0 left-0 right-0 h-14 bg-transparent"}>
      <div
          className={"absolute top-0 w-1/4 bg-black/90 h-3 z-10"}
          style={{
            left: `${scrollPosition}%`,
          }}
      >
        <div className={"absolute w-full top-0 h-10 flex items-end justify-center text-black/50"}>
          <FontAwesomeIcon
              icon={barOpen ? "chevron-up" : "chevron-down"}
              size={"2x"}
              className={`flex laptop:hidden w-full transform transition-all duration-500 rounded-b-sm ${barOpen ? "translate-y-10 backdrop-blur-sm" : "translate-y-0"}`}
              onClick={() => {
                setBarOpen(!barOpen);
              }}/>
        </div>
      </div>
      {navbarItems.map((item) => (
          <div
              className={`group/item relative flex w-1/4 items-center h-full bg-transparent backdrop-blur-2xl space-x-4 transform transition-transform duration-500 -translate-y-full cursor-pointer ${touch ? (barOpen ? "translate-y-0": "") : "group-hover/bar:translate-y-0"}`}
              onClick={() => {
                setActive(item.id);
                setBarOpen(false);
              }}
          >
            <div className={"absolute top-0 h-3 w-full bg-black/30 transform transition-transform -translate-y-full group-hover/item:translate-y-0"}/>
            <FontAwesomeIcon icon={item.icon} size={"xl"} className={"hidden laptop:flex"}/>
            <span className={"flex"}>{item.title}</span>
          </div>
      ))}
    </div>
  );
}
