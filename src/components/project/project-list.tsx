import React from "react";
import { ProjectDisplay } from "./project-display";
import { DriftBoard, DriftItem } from "../common/drift-board";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  dragBoundsRef: React.RefObject<HTMLElement | null>;
  touch: boolean;
};

// Desktop list - cards drift around and can be dragged and thrown.
export const ProjectList = ({
  projectList,
  modalOpen,
  setModalOpen,
  setSelectedProject,
  dragBoundsRef,
  touch
}: Props) => {
  const handleOpenClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <DriftBoard
      as="ul"
      boundsRef={dragBoundsRef}
      paused={modalOpen}
      touch={touch}
      className={`grid w-full transform grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] items-start gap-4 transition-transform duration-500 ${
        modalOpen ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {projectList?.map((item, index) => {
        const key = item.title + "-" + index;
        return (
          <DriftItem key={key} id={key} className="rounded-2xl bg-gray-200">
            <ProjectDisplay
              project={item}
              handleOpenClick={() => handleOpenClick(item)}
            />
          </DriftItem>
        );
      })}
    </DriftBoard>
  );
};
