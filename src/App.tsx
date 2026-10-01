import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import { navbarItems } from "./components/navbar-items";
import AboutPage from "./pages/about-page";
import HomePage from "./pages/home-page";
import { ProjectPage } from "./pages/project-page";
import { useGetSiteData } from "@/hooks/useGetSiteData";
import { useHasTouch } from "@/common/use-media-query";

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const hasTouch = useHasTouch();

  const {
    data: siteData,
    isError: isSiteDataError,
    error: siteDataError
  } = useGetSiteData();

  if (isSiteDataError) console.error("useGetSiteData error: ", siteDataError);

  // Sections can be any height (the mobile project stack is several screens
  // tall), so progress is measured per section rather than over the whole
  // page. Each section adds its share over the last screen of scrolling
  // before its top reaches the top, so the indicator rests on a slot while
  // inside a section and slides between slots on the handoff.
  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const maxScroll = scrollHeight - clientHeight;

    let position = 0;
    for (const { id } of navbarItems.slice(1)) {
      const section = document.getElementById(id);
      if (!section || clientHeight <= 0) continue;
      // A section that can't scroll all the way to the top still counts
      // as reached once the page bottoms out.
      const top = Math.min(section.offsetTop, maxScroll);
      const progress = (scrollTop - (top - clientHeight)) / clientHeight;
      position += Math.min(Math.max(progress, 0), 1);
    }
    setScrollPosition((position / (navbarItems.length - 1)) * 100);
    if (navBarOpen) setNavBarOpen(false);
  }

  return (
    <div
      className={
        "scrollbar-display-none relative h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto bg-linear-to-br from-gray-100 via-gray-200 to-gray-100"
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
  );
};

export default App;
