import React from "react";
import { ProjectListItem } from "./project";
import type { Project } from "@/generated/graphql";

type Props = {
  projectList?: Project[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

export const ProjectList = ({
  projectList,
  modalOpen,
  setModalOpen,
  setSelectedProject,
}: Props) => {
  const handleOpenClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <ul
      className={`flex flex-col space-y-6 w-full items-center justify-center transform transition-transform duration-500 ${
        modalOpen ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {projectList?.map((item, index) => (
        <ProjectListItem
          key={item.title + "-" + index}
          project={item}
          handleOpenClick={() => handleOpenClick(item)}
        />
      ))}
    </ul>
  );
};
