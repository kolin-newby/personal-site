import { ProjectList } from "../components/project/project-list";
import { ProjectListMobile } from "../components/project/project-list-mobile";

import { useIsLg } from "../common/use-media-query";
import type { Project, GetSiteDataQuery } from "@/generated/graphql";

type Props = {
  touch: boolean;
  data?: GetSiteDataQuery | undefined;
};

export const ProjectPage = ({ touch, data }: Props) => {
  // A row of cards on desktop (lg and up), a stacking list below.
  const isDesktop = useIsLg();

  const { projectDisplay } = data ?? {};
  const projectList = (projectDisplay?.projects as Project[]) ?? [];

  return (
    <section
      className="relative flex min-h-dvh w-full snap-start flex-col justify-center overflow-x-clip px-0 pt-(--nav-h) lg:px-10"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <div className="flex">
        {isDesktop ? (
          <ProjectList projectList={projectList} touch={touch} />
        ) : (
          <ProjectListMobile projectList={projectList} touch={touch} />
        )}
      </div>
    </section>
  );
};
