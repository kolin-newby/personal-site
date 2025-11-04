import { ChevronLeft } from "lucide-react";
import IdleScrollArea from "../IdleScrollArea";
import ParticleField from "../particle-field";

const WorkListItem = ({ workItem, handleOpenClick }) => {
  return (
    <li className="flex relative w-full pl-10">
      <div
        className={
          "flex flex-row w-full justify-between relative shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 rounded-l-lg items-center"
        }
      >
        <ParticleField
          lum="70%"
          maxParticlesFollowMode={40}
          className="absolute top-0 left-0 w-full h-full z-0"
          speed="slow"
        />
        <div className="flex flex-col w-3/4 space-y-3 p-16 z-10">
          <h2 className={"flex text-lg md:text-2xl"}>{workItem.title}</h2>
          <h2 className="flex text-base md:text-lg opacity-50">
            {workItem.role}
          </h2>
          <div className={"flex flex-row gap-2 text-sm md:text-base"}>
            <IdleScrollArea
              axis="x"
              speed={30}
              idleDelay={3000}
              startDirection="forward"
              className="scrollbar-display-none w-[640px]"
            >
              {workItem.skills.map((skill, index) => (
                <div className="inline-block">
                  <span>{skill}</span>
                  {index !== workItem.skills.length - 1 && (
                    <span>&nbsp;-&nbsp;</span>
                  )}
                </div>
              ))}
            </IdleScrollArea>
          </div>
        </div>
        <button
          onClick={handleOpenClick}
          className={
            "relative group flex h-full py-1 transition-all duration-300 basis-44 hover:basis-64 z-10"
          }
        >
          <div className="flex h-full w-full p-4 justify-center items-center cursor-pointer shadow bg-linear-to-br from-gray-200 to-gray-100 rounded-l-lg">
            <ChevronLeft size={"44px"} className={"flex"} />
          </div>
        </button>
      </div>
    </li>
  );
};

export default WorkListItem;
