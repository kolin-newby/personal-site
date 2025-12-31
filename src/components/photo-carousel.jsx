import { useState } from "react";
import Arrow from "./common/arrow";
import { Camera } from "lucide-react";

const PhotoCarousel = ({ imageSourceList, className }) => {
  const [active, setActive] = useState(null);
  const [photoInfoOpen, setPhotoInfoOpen] = useState(false);

  const handlePhotoInfoClick = () => {
    setPhotoInfoOpen(true);

    setTimeout(() => {
      setPhotoInfoOpen(false);
    }, 3000);
  };

  return (
    <div className={className}>
      <div
        className={
          "flex lg:items-center items-start pt-4 justify-center relative w-full"
        }
      >
        <div className="flex flex-col h-5/6 w-full">
          <div
            className={
              "flex w-full px-4 h-full items-center justify-center relative space-x-1"
            }
          >
            <div
              onClick={handlePhotoInfoClick}
              className={`group absolute lg:hidden bottom-0 inset-x-1/2 transform -translate-x-1/2 flex items-center justify-center h-8 w-full mb-2 z-20`}
            >
              <div
                className={`flex flex-row overflow-hidden items-center justify-center h-full bg-white/90 transition-all duration-300 rounded-lg ${
                  photoInfoOpen ? "px-3" : "px-1"
                }`}
              >
                <Camera
                  className={`flex transition-all duration-300 ${
                    photoInfoOpen
                      ? "opacity-0 w-0"
                      : "opacity-100 group-hover:opacity-0 group-hover:w-0"
                  }`}
                />
                <span
                  className={`hand-written text-sm flex flex-nowrap text-nowrap items-center justify-center overflow-hidden transition-all duration-300 ${
                    photoInfoOpen ? "w-64" : "w-0 group-hover:w-64"
                  }`}
                >
                  how I like to spend my free time
                </span>
              </div>
            </div>
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
          <div className="hidden lg:flex inset-x-0 bottom-full transform -rotate-3 justify-center text-xl text-black/60 items-end">
            <Arrow
              fillColor={"#eee"}
              className={"flex transform rotate-180 opacity-60"}
            />
            <div className="pb-2 text-nowrap flex space-x-1.5">
              <span className="hand-written">
                how I like to spend my free time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
