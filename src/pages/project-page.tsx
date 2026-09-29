import { useEffect, useRef, useState } from "react";

import { ProjectModal } from "../components/project/project-modal";
import { ProjectList } from "../components/project/project-list";

import { useInViewport } from "../common/use-in-viewport";
import type { Project, GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  darkMode?: boolean;
  className?: string;
  touch: boolean;
  data?: GetSiteDataQuery | undefined;
};

export const ProjectPage = ({
  darkMode,
  className = "",
  touch,
  data
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef, { threshold: 0 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { projectDisplay } = data ?? {};

  useEffect(() => {
    if (modalOpen && !isInViewport) {
      setModalOpen(false);
      setSelectedProject(null);
    }
  }, [isInViewport, modalOpen]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh w-full snap-start flex-col justify-center overflow-x-clip pt-(--nav-h)"
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
        projectList={(projectDisplay?.projects as Project[]) ?? []}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setSelectedProject={setSelectedProject}
      />
    </section>
  );
};
