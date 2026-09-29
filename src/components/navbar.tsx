import React, { type ReactElement } from "react";
import { BriefcaseBusiness, ChevronDown, House, User } from "lucide-react";

type NavbarItem = {
  id: string;
  title: string;
  icon: ReactElement;
};

type Props = {
  scrollPosition: number;
  touch: boolean;
  barOpen: boolean;
  setBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const navbarItems: NavbarItem[] = [
  { id: "home", title: "Home", icon: <House /> },
  { id: "about", title: "About", icon: <User /> },
  { id: "projects", title: "Projects", icon: <BriefcaseBusiness /> }
];

const navbarItemWidth = (1 / navbarItems.length) * 100;

const Navbar = ({
  scrollPosition,
  touch,
  barOpen,
  setBarOpen,
  className = ""
}: Props) => {
  return (
    <div
      className={`group/bar sticky top-0 z-50 -mb-(--nav-h) flex h-(--nav-h) w-full ${className}`}
    >
      <div
        style={{
          width: `${navbarItemWidth}%`,
          left: `${(scrollPosition / 100) * (100 - navbarItemWidth)}%`
        }}
        className={"absolute top-0 z-10 h-3 rounded-sm bg-black/80"}
      >
        <div
          className={
            "pointer-events-none absolute top-3 flex h-[calc(var(--nav-h)-0.75rem)] w-full items-end justify-center text-black/50"
          }
        >
          {touch && (
            <button
              type="button"
              className={`pointer-events-auto flex w-full transform rounded-sm transition-all duration-500 ${
                barOpen
                  ? "translate-y-full bg-black/80 text-white backdrop-blur-md"
                  : "translate-y-0 text-black/80"
              }`}
              onClick={() => {
                setBarOpen(!barOpen);
              }}
            >
              <ChevronDown
                className={`flex w-full transform transition-transform duration-300 ${
                  barOpen ? "rotate-180" : "rotate-0"
                }`}
                size={"36px"}
              />
            </button>
          )}
        </div>
      </div>
      {navbarItems.map((item, index) => (
        <button
          key={`nav-item-${index}-${item.id}`}
          type="button"
          style={{ width: `${navbarItemWidth}%` }}
          className={`group/item relative flex h-full -translate-y-full transform cursor-pointer items-center justify-center gap-1.5 bg-transparent pt-3 text-sm whitespace-nowrap transition-transform duration-500 group-has-focus-visible/bar:translate-y-0 md:gap-2 md:text-base ${
            touch
              ? barOpen
                ? "translate-y-0"
                : ""
              : "group-hover/bar:translate-y-0"
          }`}
          onClick={() => {
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth" });
            setBarOpen(false);
          }}
        >
          <div
            className={
              "absolute top-0 h-3 w-full -translate-y-full transform bg-black/30 transition-transform group-hover/item:translate-y-0 group-focus-visible/item:translate-y-0"
            }
          />
          {item.icon}
          <span className={"flex"}>{item.title}</span>
        </button>
      ))}
    </div>
  );
};

export default Navbar;
