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
    error: siteDataError
  } = useGetSiteData();

  if (isSiteDataError) console.error("useGetSiteData error: ", siteDataError);

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    let container = event.currentTarget;
    let maxScroll = container.scrollHeight - container.clientHeight;
    let scrollPositionTemp =
      maxScroll > 0
        ? Number((container.scrollTop / maxScroll).toFixed(5)) * 100
        : 0;
    setScrollPosition(scrollPositionTemp);
    if (navBarOpen) setNavBarOpen(false);
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
    <Suspense fallback={<LoadingCover />}>
      <div
        className={
          "relative h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto bg-linear-to-br from-gray-100 via-gray-200 to-gray-100"
        }
        onScroll={handleScroll}
        onClick={() => {
          if (navBarOpen) setNavBarOpen(false);
        }}
      >
        <Navbar
          scrollPosition={scrollPosition}
          touch={hasTouch}
          barOpen={navBarOpen}
          setBarOpen={setNavBarOpen}
        />
        <div className="w-full">
          <HomePage touch={hasTouch} data={siteData} />
          <AboutPage touch={hasTouch} data={siteData} />
          <ProjectPage touch={hasTouch} data={siteData} />
        </div>
      </div>
    </Suspense>
  );
};

export default App;
