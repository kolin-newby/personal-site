import React, { useState, useEffect, useCallback } from "react";
import Typer from "../components/typer";
import ParticleField from "../components/particle-field";

const HomePage = ({ className = "" }) => {
  const [hasTouch, setHasTouch] = useState(false);

  const isTouchDevice = useCallback(() => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    setHasTouch(isTouchDevice());
  }, [isTouchDevice]);

  return (
    <div className={`w-full h-screen overflow-hidden relative ${className}`}>
      <ParticleField
        followMode={!hasTouch}
        lum="60%"
        maxParticlesFollowMode={110}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div
        id={"home"}
        className={"relative w-full h-screen pointer-events-none"}
      >
        <div id={"wrapper relative h-full"}>
          <canvas
            id={"homePage"}
            className={"absolute inset-0 dark:effect-color-light"}
          />
          <div
            className={
              "absolute inset-0 flex flex-col text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold bg-clip-text bg-transparent pointer-events-none " +
              "items-center justify-center space-y-1"
            }
          >
            <div className={"flex text-center rounded-2xl relative px-4 py-3"}>
              Hi, I'm Kolin
              <br />
            </div>
            <Typer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
