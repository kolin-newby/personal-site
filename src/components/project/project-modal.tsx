import React, { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import IdleScrollArea from "../idle-scroll-area";
import { RepoPreview } from "../repo-preview";
import type { Project } from "@/generated/graphql";
import { renderDocumentNodes } from "../document-renderer";
import type { Element as DocumentElement } from "../document-renderer";
import TextHighlighterContainer from "../text-highlighter-container";

type Props = {
  open: boolean;
  selectedProject: Project | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

export const ProjectModal = ({
  open,
  selectedProject,
  setOpen,
  setSelectedProject,
}: Props) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleCloseClick = () => {
    setOpen(false);
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedProject(null);
      closeTimeoutRef.current = null;
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-hidden={!open}
      inert={!open}
      className={`absolute top-0 left-0 flex flex-col pb-20 justify-start w-full h-screen bg-linear-to-br from-gray-100 to-gray-200 transform transition-transform duration-500 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex min-h-16" />
      <div className="flex flex-row space-x-10">
        <button
          onClick={handleCloseClick}
          className="flex items-center justify-center p-5 shadow-inner rounded-r-lg bg-linear-to-br from-black/10 to-gray-200/50 transition-all duration-300 basis-20 hover:basis-32"
        >
          <ChevronRight size={"44px"} className="flex" />
        </button>
        <div className="flex flex-col justify-center space-y-2">
          <h1>
            <span className="flex text-xl sm:text-3xl">
              {selectedProject?.title}
            </span>
            <span className="flex text-base sm:text-xl">
              {selectedProject?.projectContext}
            </span>
          </h1>
          <div className="flex w-full h-0.5 bg-black" />
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:flex-row justify-center items-center grow">
        <div className="flex flex-col w-full h-max p-6 items-center justify-center text-xs sm:text-base lg:text-lg space-y-4 md:w-1/2">
          <TextHighlighterContainer
            terms={selectedProject?.skills?.map((skill) => skill.name ?? "")}
          >
            {renderDocumentNodes(
              (selectedProject?.description?.document as DocumentElement[]) ??
                [],
            )}
          </TextHighlighterContainer>
        </div>
        {selectedProject?.gallery && selectedProject?.gallery?.length > 0 ? (
          <>
            <div className="flex px-2 md:hidden">
              <IdleScrollArea
                axis={"x"}
                speed={25}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none max-h-55 min-h-50"
              >
                {selectedProject?.gallery?.map((image) => (
                  <img
                    key={`${image.id}-X`}
                    src={image.image?.url}
                    alt={image.altText ?? ""}
                    className="inline-flex flex-none mx-2 h-55 object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </IdleScrollArea>
            </div>
            <div className="hidden px-2 md:flex max-w-125 max-h-150">
              <IdleScrollArea
                axis={"y"}
                speed={25}
                idleDelay={3000}
                startDirection="forward"
                className="scrollbar-display-none max-h-125 w-full"
              >
                {selectedProject?.gallery?.map((image) => (
                  <img
                    key={`${image.id}-Y`}
                    src={image.image?.url}
                    alt={image.altText ?? ""}
                    className="inline-flex flex-none my-2 h-62.5 object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </IdleScrollArea>
            </div>
          </>
        ) : (
          <RepoPreview
            url={selectedProject?.repository?.link?.url ?? ""}
            type={selectedProject?.repository?.type ?? "github"}
          />
        )}
      </div>
      <div className="flex flex-col items-center px-2">
        <IdleScrollArea
          axis="x"
          speed={35}
          idleDelay={2000}
          startDirection="forward"
          className="scrollbar-display-none py-2 w-full text-center"
        >
          {selectedProject?.skills?.map((skill, index) => (
            <p className="inline-flex" key={skill.id}>
              {index !== 0 && <span>&nbsp;-&nbsp;</span>}
              <span>{skill.name}</span>
            </p>
          ))}
        </IdleScrollArea>
      </div>
    </div>
  );
};
