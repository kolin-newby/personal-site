import "./App.css";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { loadIcons } from "./config/iconLoader";
import LoadingCover from "./components/loading-cover";
import Navbar from "./components/navbar";
import AboutPage from "./pages/about-page";
import HomePage from "./pages/home-page";
import WorkPage from "./pages/work-page";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const [hasTouch, setHasTouch] = useState(false);

  // useEffect(() => {
  //     let mode = document.cookie.split("=")[1] === "true";
  //     setDarkMode(mode);
  // }, []);

  function handleScroll(event) {
    let container = event.target;
    let scrollPositionTemp =
      Number((container.scrollTop / container.scrollHeight).toFixed(5)) * 100;
    setScrollPosition(scrollPositionTemp);
  }

  const isTouchDevice = useCallback(() => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    try {
      loadIcons();
    } catch (error) {
      console.error("Failed to load icons: ", error);
    }
    try {
      setHasTouch(isTouchDevice());
    } catch (error) {
      console.error("Failed to detect touchscreen: ", error);
    }
  }, [hasTouch, isTouchDevice, scrollPosition]);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } bg-linear-to-br from-gray-100 via-gray-200 to-gray-100 h-screen snap-y 
          snap-mandatory snap overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-display-none`}
      onScroll={handleScroll}
      onClick={() => {
        if (navBarOpen) setNavBarOpen(false);
      }}
    >
      <Suspense fallback={<LoadingCover />}>
        <Navbar
          id={"navbar"}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          scrollPosition={scrollPosition}
          touch={hasTouch}
          barOpen={navBarOpen}
          setBarOpen={setNavBarOpen}
        />
        <HomePage className={"snap-start my-0.5"} touch={hasTouch} />
        <AboutPage className={"snap-start my-0.5"} />
        <WorkPage className={"snap-start my-0.5"} />
      </Suspense>
    </div>
  );
};

export default App;
