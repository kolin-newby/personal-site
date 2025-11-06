import { useState } from "react";

const PhotoCarousel = ({ imageSourceList, className }) => {
  const [active, setActive] = useState(null);

  return (
    <div className={className}>
      <div
        className={
          "flex lg:items-center items-start pt-4 justify-center relative w-full"
        }
      >
        <div
          className={
            "flex w-11/12 h-3/4 items-center justify-center relative space-x-1"
          }
        >
          {imageSourceList?.map((source, index) => (
            <div
              key={`image-${source}-${index}`}
              className={`flex ${
                active === index
                  ? "basis-full z-10 shadow-2xl"
                  : active === null
                  ? "flex-col overflow-hidden basis-24 hover:basis-1/2 shadow-xl z-0"
                  : "basis-0"
              } bg-center bg-cover bg-no-repeat h-full transition-all duration-700 rounded-lg transform justify-end items-end`}
              style={{
                backgroundImage: `url('${source}')`,
              }}
              onClick={() => {
                if (active !== index) setActive(index);
                else setActive(null);
              }}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
