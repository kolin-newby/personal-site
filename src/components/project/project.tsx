import { ChevronLeft } from "lucide-react";
import IdleScrollArea from "../idle-scroll-area";
import ParticleField from "../particle-field";
import type { Keyword, Project } from "@/generated/graphql";

type Props = {
  project: Project;
  handleOpenClick: () => void;
};

export const ProjectListItem = ({ project, handleOpenClick }: Props) => {
  return (
    <li className="relative flex w-full pl-4">
      <div
        className={
          "relative flex w-full flex-row items-center justify-between rounded-l-lg bg-linear-to-br from-black/10 to-gray-200/50 shadow-inner"
        }
      >
        <ParticleField
          lum="70%"
          className="absolute top-0 left-0 z-0 h-full w-full"
          speed="slow"
          color
          particleDensity={12}
        />
        <div className="z-10 flex w-3/4 flex-col space-y-3 px-6 py-8">
          <h2 className={"flex text-lg md:text-2xl"}>{project.title}</h2>
          <h2 className="flex text-base opacity-50 md:text-lg">
            {project.projectContext}
          </h2>
          <div className={"flex flex-row gap-2 text-sm md:text-base"}>
            <IdleScrollArea
              axis="x"
              speed={30}
              idleDelay={3000}
              startDirection="forward"
              className="scrollbar-display-none w-160"
            >
              {project.skills?.map((skill: Keyword, index: number) => (
                <div
                  className="inline-block"
                  key={`skill-item-${index}-${skill}`}
                >
                  {index !== 0 && <span>&nbsp;-&nbsp;</span>}
                  <span>{skill.name}</span>
                </div>
              ))}
            </IdleScrollArea>
          </div>
        </div>
        <button
          onClick={handleOpenClick}
          className={
            "group relative z-10 flex h-full basis-44 py-1 transition-all duration-300 hover:basis-64"
          }
        >
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-l-lg bg-linear-to-br from-gray-200 to-gray-100 p-4 shadow">
            <ChevronLeft size={"44px"} className={"flex"} />
          </div>
        </button>
      </div>
    </li>
  );
};
