import { useState } from "react";

const PhotoCarousel = () => {
  const [active, setActive] = useState(null);

  return (
    <div className={`flex laptop:w-1/2 w-full h-5/6 laptop:h-full`}>
      <div
        className={
          "flex laptop:items-center items-start pt-4 justify-center relative w-full"
        }
      >
        <div
          className={
            "flex w-11/12 h-3/4 items-center justify-center relative space-x-1"
          }
        >
          <div
            className={`flex ${
              active === 1
                ? "basis-full z-10 shadow-2xl"
                : active === null
                ? "flex-col overflow-hidden basis-24 hover:basis-3/12 shadow-xl z-0"
                : "basis-0"
            } bg-center bg-cover bg-no-repeat bg-photo-1 h-full transition-all duration-700 rounded-lg transform justify-end items-end`}
            onClick={() => setActive(1)}
            onMouseOut={() => setActive(null)}
          ></div>
          <div
            className={`flex ${
              active === 2
                ? "basis-full z-10 shadow-2xl"
                : active === null
                ? "flex-col basis-24 hover:basis-3/12 shadow-xl z-0"
                : "basis-0"
            } bg-center bg-cover bg-no-repeat bg-photo-3 h-full transition-all duration-500 rounded-lg transform`}
            onClick={() => setActive(2)}
            onMouseOut={() => setActive(null)}
          />
          <div
            className={`flex ${
              active === 3
                ? "basis-full z-10 shadow-2xl"
                : active === null
                ? "flex-col basis-24 hover:basis-3/12 shadow-xl z-0"
                : "basis-0"
            } bg-center bg-cover bg-no-repeat bg-photo-4 h-full transition-all duration-500 rounded-lg transform`}
            onClick={() => setActive(3)}
            onMouseOut={() => setActive(null)}
          />
          <div
            className={`flex ${
              active === 4
                ? "basis-full z-10 shadow-2xl"
                : active === null
                ? "flex-col basis-24 hover:basis-3/12 shadow-xl z-0"
                : "basis-0"
            } bg-center bg-cover bg-no-repeat bg-photo-5 h-full transition-all duration-500 rounded-lg transform`}
            onClick={() => setActive(4)}
            onMouseOut={() => setActive(null)}
          />
          <div
            className={`flex ${
              active === 5
                ? "basis-full z-10 shadow-2xl"
                : active === null
                ? "flex-col basis-24 hover:basis-3/12 shadow-xl z-0"
                : "basis-0"
            } bg-center bg-cover bg-no-repeat bg-photo-6 h-full transition-all duration-500 rounded-lg transform`}
            onClick={() => setActive(5)}
            onMouseOut={() => setActive(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
