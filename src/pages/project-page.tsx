import { useRef } from "react";

import { ProjectList } from "../components/project/project-list";
import { ProjectListMobile } from "../components/project/project-list-mobile";

import { useIsLg } from "../common/use-media-query";
import type { Project, GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  touch: boolean;
  data?: GetSiteDataQuery | undefined;
};

export const ProjectPage = ({ touch, data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Drifting drag-and-drop cards on desktop (lg and up), a static list below.
  const isDesktop = useIsLg();

  const { projectDisplay } = data ?? {};
  const projectList = (projectDisplay?.projects as Project[]) ?? [];

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
