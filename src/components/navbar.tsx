import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { navbarItems } from "./navbar-items";
import { NavLink, useLocation } from "react-router";

type Props = {
  touch: boolean;
  barOpen: boolean;
  setBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navbarItemWidth = (1 / navbarItems.length) * 100;
const indicatorTransitionMs = 300;

const Navbar = ({ touch, barOpen, setBarOpen }: Props) => {
  // The item being hovered or keyboard-focused. The indicator previews it,
  // then glides back to the current page's item when it's cleared.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { pathname } = useLocation();
  // A host can serve /portfolio as /portfolio/, so trailing slashes are
  // ignored when matching.
  const currentPath = pathname.replace(/\/+$/, "") || "/";
  const active = navbarItems.findIndex((i) => i.path === currentPath);
  const indicatorLeft = (hoveredIndex ?? active) * navbarItemWidth;

  const previewItem = (index: number) => setHoveredIndex(index);
  const endPreview = () => setHoveredIndex(null);

  return (
    <nav
      aria-label="Main"
      className="group/bar sticky top-0 z-50 -mb-(--nav-h) flex h-(--nav-h) w-full"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") endPreview();
      }}
    >
      <div
        style={{
          width: `${navbarItemWidth}%`,
          left: `${indicatorLeft}%`,
          transitionDuration: `${indicatorTransitionMs}ms`
        }}
        className="absolute top-0 z-10 h-3 rounded-sm bg-black/80 transition-[left] ease-out"
      >
        <div
          className={
            "pointer-events-none absolute top-3 flex h-[calc(var(--nav-h)-0.75rem)] w-full items-end justify-center text-black/50"
          }
        >
          {touch && (
            <button
              type="button"
              aria-label={barOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={barOpen}
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
        // Real links, so crawlers find every page and each one can be opened
        // in a new tab or copied.
        <NavLink
          key={`nav-item-${index}-${item.id}`}
          to={item.path}
          style={{ width: `${navbarItemWidth}%` }}
          className={`relative flex h-full -translate-y-full transform cursor-pointer items-center justify-center gap-1.5 bg-transparent pt-3 text-sm whitespace-nowrap transition-transform duration-500 group-has-focus-visible/bar:translate-y-0 md:gap-2 md:text-base ${
            touch
              ? barOpen
                ? "translate-y-0"
                : ""
              : "group-hover/bar:translate-y-0"
          }`}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") previewItem(index);
          }}
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) previewItem(index);
          }}
          onBlur={endPreview}
          onClick={(e) => {
            // A new-tab/window click doesn't leave this page, so keep the
            // bar as it is.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            setBarOpen(false);
          }}
        >
          {item.icon}
          <span className={"flex"}>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
