import { useEffect, useRef, useState } from "react";

import { ProjectModal } from "../components/project/project-modal";
import { ProjectList } from "../components/project/project-list";

import { useInViewport } from "../common/use-in-viewport";
import { useGetProjects } from "@/hooks/useGetProjects";
import type { Project } from "@/generated/graphql";

type Props = {
  darkMode?: boolean;
  className?: string;
};

export const ProjectPage = ({ darkMode, className = "" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef, { threshold: 0 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data, isError, error } = useGetProjects();

  if (isError) console.error("useGetBio failed:", error);

  useEffect(() => {
    if (modalOpen && !isInViewport) {
      setModalOpen(false);
      setSelectedProject(null);
    }
  }, [isInViewport, modalOpen]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen relative w-full justify-center ${className}`}
      id="projects"
      aria-label="projects"
    >
      <ProjectModal
        open={modalOpen}
        selectedProject={selectedProject}
        setOpen={setModalOpen}
        setSelectedProject={setSelectedProject}
      />
      <ProjectList
        projectList={(data?.projectDisplay?.projects as Project[]) ?? []}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
};
