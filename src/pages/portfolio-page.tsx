import { ProjectList } from "../components/project/project-list";
import { ProjectListMobile } from "../components/project/project-list-mobile";

import { useHasTouch, useIsLg } from "../common/use-media-query";
import type { Project } from "@/generated/graphql";
import { PageMeta } from "@/components/page-meta";
import { useGetSiteData } from "@/hooks/useGetSiteData";

const PortfolioPage = () => {
  // A row of cards on desktop (lg and up), a stacking list below.
  const isDesktop = useIsLg();
  const touch = useHasTouch();
  const { data } = useGetSiteData();

  const { projectDisplay } = data ?? {};
  const projectList = (projectDisplay?.projects as Project[]) ?? [];

  return (
    <>
      <PageMeta
        title="Portfolio | Kolin Newby"
        description="Projects by Kolin Newby, a full-stack software engineer in Denver: what each one does and the technology behind it."
        path="/portfolio/"
      />
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
    </>
  );
};

export default PortfolioPage;
