import React, { useState } from "react";

const Follower = ({ active, setActive, modalOpen, setModalOpen }) => {
  const [position, setPosition] = useState({ x: null, y: null });

  const updatePosition = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // if(!active || modalOpen) return;

  return (
    <div
      className={
        "absolute inset-0 w-full h-full cursor-none selection:bg-transparent"
      }
      onMouseMove={active ? updatePosition : null}
      onClick={() => {
        setActive(false);
        setModalOpen(true);
      }}
    >
      <div
        style={
          position.x && position.y
            ? {
                top: `${position.y}px`,
                left: `${position.x}px`,
                height: `${active ? "11rem" : "0px"}`,
                width: `${active ? "11rem" : "0px"}`,
              }
            : null
        }
        className={
          "absolute hidden laptop:flex transform pointer-events-none size-transition text-nowrap overflow-hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gray-400/30 rounded-full backdrop-blur-lg"
        }
      >
        <span className={"flex font-bold text-2xl"}>Click...</span>
      </div>
    </div>
  );
};

export default Follower;
