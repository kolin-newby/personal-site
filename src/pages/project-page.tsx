import { useEffect, useRef, useState } from "react";

import { ProjectModal } from "../components/project/project-modal";
import { ProjectList } from "../components/project/project-list";
import { ProjectListMobile } from "../components/project/project-list-mobile";

import { useInViewport } from "../common/use-in-viewport";
import { useMediaQuery } from "../common/use-media-query";
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
  // Drifting drag-and-drop cards on desktop (lg and up), a static list below.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { projectDisplay } = data ?? {};
  const projectList = (projectDisplay?.projects as Project[]) ?? [];

  useEffect(() => {
    if (modalOpen && !isInViewport) {
      setModalOpen(false);
      setSelectedProject(null);
    }
  }, [isInViewport, modalOpen]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh w-full snap-start flex-col justify-center overflow-x-clip px-0 pt-(--nav-h) lg:px-10"
      id="projects"
      aria-label="projects"
    >
      <div className="flex">
        {isDesktop ? (
          <ProjectList
            projectList={projectList}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setSelectedProject={setSelectedProject}
            dragBoundsRef={containerRef}
            touch={touch}
          />
        ) : (
          <ProjectListMobile projectList={projectList} touch={touch} />
        )}
      </div>
    </section>
  );
};
