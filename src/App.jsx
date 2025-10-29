import "./App.css";
import React, { useEffect, useState, Suspense } from "react";
import { loadIcons } from "./config/iconLoader";

const Navbar = React.lazy(() => import("./components/navbar"));
const About = React.lazy(() => import("./components/about"));
const Contact = React.lazy(() => import("./components/contact"));
const Home = React.lazy(() => import("./components/home"));
const Portfolio = React.lazy(() => import("./components/portfolio"));

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  function detectTouch() {
    setHasTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }

  useEffect(() => {
    try {
      loadIcons();
    } catch (error) {
      console.error("Failed to load icons: ", error);
    }
    try {
      detectTouch();
    } catch (error) {
      console.error("Failed to detect touchscreen: ", error);
    }
  }, [hasTouch, scrollPosition]);

  useEffect(() => {
    const typingScript = document.createElement("script");
    typingScript.src = "/scripts/typewriter.js";
    typingScript.async = true;

    // const cursorScript = document.createElement('script');
    // cursorScript.src = "/scripts/cursor-effect.js";
    // cursorScript.async = true;

    typingScript.onerror = () => console.error("Failed to load typewriter.js");
    // cursorScript.onerror = () => console.error("Failed to load cursor-effect.js");

    document.body.appendChild(typingScript);
    // document.body.appendChild(cursorScript);

    return () => {
      if (typingScript.parentNode) document.body.removeChild(typingScript);
      // if(cursorScript.parentNode) document.body.removeChild(cursorScript);
    };
  }, []);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 h-screen snap-y 
          snap-mandatory snap overflow-y-scroll scroll-smooth scrollbar-display-none`}
      onScroll={handleScroll}
    >
      <Suspense fallback={<div aria-busy="true">Loading...</div>}>
        <Navbar
          id={"navbar"}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          scrollPosition={scrollPosition}
          touch={hasTouch}
        />
        <Home className={"snap-start"} />
        <About className={"snap-start"} />
        <Portfolio className={"snap-start"} />
        <Contact className={"snap-start"} touch={hasTouch} />
      </Suspense>
    </div>
  );
};

export default App;
