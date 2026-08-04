import "./App.css";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import LoadingCover from "./components/loading-cover";
import Navbar from "./components/navbar";
import AboutPage from "./pages/about-page";
import HomePage from "./pages/home-page";
import { ProjectPage } from "./pages/project-page";
import { useGetSiteData } from "@/hooks/useGetSiteData";

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const [hasTouch, setHasTouch] = useState(false);

  const {
    data: siteData,
    isError: isSiteDataError,
    error: siteDataError,
  } = useGetSiteData();

  if (isSiteDataError) console.error("useGetSiteData error: ", siteDataError);

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    let container = event.target as HTMLDivElement;
    let scrollPositionTemp =
      Number((container.scrollTop / container.scrollHeight).toFixed(5)) * 100;
    setScrollPosition(scrollPositionTemp);
  }

  const isTouchDevice = useCallback((): boolean => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as Navigator & { msMaxTouchPoints?: number })
        .msMaxTouchPoints! > 0
    );
  }, []);

  useEffect(() => {
    try {
      setHasTouch(isTouchDevice());
    } catch (error) {
      console.error("Failed to detect touchscreen: ", error);
    }
  }, [hasTouch, isTouchDevice, scrollPosition]);

  return (
    <div
      className={
        "bg-linear-to-br from-gray-100 via-gray-200 to-gray-100 h-dvh snap-y snap-always snap overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-display-none"
      }
      onScroll={handleScroll}
      onClick={() => {
        if (navBarOpen) setNavBarOpen(false);
      }}
    >
      <Suspense fallback={<LoadingCover />}>
        <Navbar
          scrollPosition={scrollPosition}
          touch={hasTouch}
          barOpen={navBarOpen}
          setBarOpen={setNavBarOpen}
        />
        <HomePage
          className={"snap-start my-0.5"}
          touch={hasTouch}
          data={siteData}
        />
        <AboutPage
          className={"snap-start my-0.5"}
          touch={hasTouch}
          data={siteData}
        />
        <ProjectPage
          className={"snap-start my-0.5"}
          touch={hasTouch}
          data={siteData}
        />
      </Suspense>
    </div>
  );
};

export default App;
