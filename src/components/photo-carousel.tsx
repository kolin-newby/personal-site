import React, { useEffect, useRef, useState } from "react";
import Arrow from "./common/arrow";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { responsiveImage } from "@/common/image-url";

// Matches both the site gallery's photos and a project's gallery.
export type CarouselPhoto = {
  id: string;
  altText?: string | null | undefined;
  image?: { url: string } | null | undefined;
};

type Props = {
  className?: string;
  photos?: CarouselPhoto[] | null | undefined;
  tagline?: string | null | undefined;
  // Show the whole photo when expanded, leaving bars, instead of cropping it
  // to fill the frame.
  fitExpanded?: boolean;
  // Background class for the open photo, e.g. "bg-black/80", which is what
  // fills the bars left by fitExpanded.
  expandedBgClassName?: string;
  // The <img> sizes attribute: about how wide an open photo gets.
  sizes?: string;
  activePhotoIndex: number | null;
  setActivePhotoIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const PhotoCarousel = ({
  className,
  photos,
  tagline,
  fitExpanded = false,
  expandedBgClassName = "",
  sizes = "100vw",
  activePhotoIndex,
  setActivePhotoIndex
}: Props) => {
  const [photoInfoOpen, setPhotoInfoOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const photoCount = photos?.length ?? 0;

  const showAdjacentPhoto = (index: number, step: 1 | -1) => {
    setActivePhotoIndex(index + step);
  };

  const handlePhotoInfoClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setPhotoInfoOpen(true);

    timeoutRef.current = setTimeout(() => {
      setPhotoInfoOpen(false);
      timeoutRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={className}>
      <div
        className={
          "flex w-full items-start justify-center py-2 md:py-4 lg:items-center"
        }
      >
        <div className="flex h-full w-full flex-col">
          <div
            className={
              "flex h-full w-full items-center justify-center space-x-1 px-2 md:px-4"
            }
          >
            {photos?.map((image, index) => (
              <div
                key={`image-${image.id}-${index}`}
                className={`relative flex overflow-hidden ${
                  activePhotoIndex === index
                    ? `z-10 basis-full shadow-2xl ${expandedBgClassName}`
                    : activePhotoIndex === null
                      ? "z-0 basis-24 flex-col shadow hover:basis-1/2"
                      : "basis-0"
                } h-full transform items-end justify-end rounded-lg transition-all duration-700`}
                onClick={() => {
                  if (activePhotoIndex !== index) setActivePhotoIndex(index);
                  else setActivePhotoIndex(null);
                }}
              >
                {image.image?.url && (
                  <img
                    {...responsiveImage(image.image.url)}
                    sizes={sizes}
                    alt={image.altText ?? ""}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full ${
                      fitExpanded && activePhotoIndex === index
                        ? "object-contain"
                        : "object-cover"
                    }`}
                  />
                )}
                {index > 0 && (
                  <button
                    type="button"
                    aria-label="Previous photo"
                    tabIndex={activePhotoIndex === index ? 0 : -1}
                    onClick={(event) => {
                      event.stopPropagation();
                      showAdjacentPhoto(index, -1);
                    }}
                    className={`absolute top-1/2 left-0 flex -translate-y-1/2 items-center justify-center rounded-r-lg bg-white/90 py-2 pr-0.5 pl-1 transition-opacity duration-300 ${
                      activePhotoIndex === index
                        ? "opacity-100 delay-500"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                {index < photoCount - 1 && (
                  <button
                    type="button"
                    aria-label="Next photo"
                    tabIndex={activePhotoIndex === index ? 0 : -1}
                    onClick={(event) => {
                      event.stopPropagation();
                      showAdjacentPhoto(index, 1);
                    }}
                    className={`absolute top-1/2 right-0 flex -translate-y-1/2 items-center justify-center rounded-l-lg bg-white/90 py-2 pr-1 pl-0.5 transition-opacity duration-300 ${
                      activePhotoIndex === index
                        ? "opacity-100 delay-500"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePhotoInfoClick();
                  }}
                  className={`group absolute right-0 bottom-0 flex transition-opacity duration-300 ${
                    activePhotoIndex === index
                      ? "opacity-100 delay-500"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex flex-row items-center justify-center overflow-hidden rounded-tl-lg bg-white/90 px-1 py-0.5 transition-all duration-300">
                    <Camera
                      className={`flex pr-0.5 transition-all duration-300 ${
                        photoInfoOpen
                          ? "w-0 opacity-0"
                          : "opacity-100 group-hover:w-0 group-hover:opacity-0"
                      }`}
                      size={18}
                    />
                    <span
                      className={`transition-all duration-300 ${
                        photoInfoOpen
                          ? "w-0 opacity-0"
                          : "opacity-100 group-hover:w-0 group-hover:opacity-0"
                      }`}
                    >
                      ?
                    </span>
                    <span
                      className={`hand-written flex flex-nowrap items-center justify-center overflow-hidden text-sm text-nowrap transition-all duration-300 ${
                        photoInfoOpen ? "w-64" : "w-0 group-hover:w-64"
                      }`}
                    >
                      {image.altText ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {tagline && (
            <div className="inset-x-0 bottom-full hidden -rotate-3 transform items-end justify-center text-xl text-black/60 lg:flex">
              <Arrow className={"flex rotate-180 transform opacity-60"} />
              <div className="flex space-x-1.5 pb-2 text-nowrap">
                <p className="hand-written">{tagline}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;
