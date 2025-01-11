import "./App.css";
import React, { useEffect, useState } from "react";
import { loadIcons } from "./config/iconLoader";

const Navbar = React.lazy(() => import("./components/navbar"));
const About = React.lazy(() => import("./components/about"));
const Contact = React.lazy(() => import("./components/contact"));
const Home = React.lazy(() => import("./components/home"));
const Portfolio = React.lazy(() => import("./components/portfolio"));

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    // useEffect(() => {
    //     let mode = document.cookie.split("=")[1] === "true";
    //     setDarkMode(mode);
    // }, []);

    function handleScroll(event) {
        let container = event.target;
        let scrollPositionTemp = (Number((container.scrollTop / container.scrollHeight).toFixed(5)) * 100);
        setScrollPosition(scrollPositionTemp);
    }

    useEffect(() => {
        try {
            loadIcons();
        } catch (error) {
            console.error("Failed to load icons:", error);
        }
    }, []);

    useEffect(() => {
        const cursorScript = document.createElement('script');
        cursorScript.src = "/scripts/cursor-effect.js";
        cursorScript.async = true;

        const typingScript = document.createElement('script');
        typingScript.src = "/scripts/typewriter.js";
        typingScript.async = true;

        cursorScript.onerror = () => console.error("Failed to load cursor-effect.js");
        typingScript.onerror = () => console.error("Failed to load typewriter.js");

        document.body.appendChild(typingScript);
        document.body.appendChild(cursorScript);

        return () => {
            if(typingScript.parentNode) document.body.removeChild(typingScript);
            if(cursorScript.parentNode) document.body.removeChild(cursorScript);
        }
    }, []);

  return (
      <div
          className={`${darkMode ? "dark" : ""} bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 h-screen snap-y 
          snap-mandatory snap overflow-y-scroll scroll-smooth scrollbar-display-none`}
        onScroll={handleScroll}
      >
          <Navbar id={"navbar"} darkMode={darkMode} setDarkMode={setDarkMode} scrollPosition={scrollPosition} />
          <Home className={"snap-start"}/>
          <About className={"snap-start"}/>
          <Portfolio className={"snap-start"}/>
          <Contact className={"snap-start"}/>
      </div>
  );
}

function cursorScript() {
    return (
        <script>
            alert("hi");
        </script>
    )
}
