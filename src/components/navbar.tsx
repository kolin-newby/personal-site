import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { navbarItems } from "./navbar-items";

type Props = {
  scrollPosition: number;
  touch: boolean;
  barOpen: boolean;
  setBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navbarItemWidth = (1 / navbarItems.length) * 100;
const indicatorTransitionMs = 300;

const Navbar = ({ scrollPosition, touch, barOpen, setBarOpen }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Keeps the transition on briefly after hover ends so the indicator glides
  // back to the active item, then drops it so scroll tracking stays immediate.
  const [snappingBack, setSnappingBack] = useState(false);
  const snapBackTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(snapBackTimeout.current), []);

  const previewItem = (index: number) => {
    window.clearTimeout(snapBackTimeout.current);
    setSnappingBack(false);
    setHoveredIndex(index);
  };

  const endPreview = () => {
    if (hoveredIndex === null) return;
    setHoveredIndex(null);
    setSnappingBack(true);
    window.clearTimeout(snapBackTimeout.current);
    snapBackTimeout.current = window.setTimeout(
      () => setSnappingBack(false),
      indicatorTransitionMs
    );
  };

  const indicatorLeft =
    hoveredIndex === null
      ? (scrollPosition / 100) * (100 - navbarItemWidth)
      : hoveredIndex * navbarItemWidth;

  return (
    <nav
      aria-label="Sections"
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
        className={`absolute top-0 z-10 h-3 rounded-sm bg-black/80 ease-out ${
          hoveredIndex !== null || snappingBack ? "transition-[left]" : ""
        }`}
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
        // Real links, so crawlers see the sections and they can be opened or
        // copied; clicks are taken over to scroll smoothly instead of jumping.
        <a
          key={`nav-item-${index}-${item.id}`}
          href={`#${item.id}`}
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
            // Leave new-tab/window clicks to the browser.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth" });
            setBarOpen(false);
          }}
        >
          {item.icon}
          <span className={"flex"}>{item.title}</span>
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
