import { ChevronLeft } from "lucide-react";
import IdleScrollArea from "../components/IdleScrollArea";

const WorkPage = ({ darkMode, className = "" }) => {
  const graylogPhotos = [
    {
      src: "/img/gray_api_sec_1.png",
      alt: "graylog api security 1",
    },
    {
      src: "/img/gray_api_sec_2.png",
      alt: "graylog api security 2",
    },
    {
      src: "/img/gray_api_sec_3.png",
      alt: "graylog api security 3",
    },
  ];
  const apiSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
  ];

  return (
    <div
      className={`flex flex-col h-screen relative w-full items-center justify-center space-y-6 ${className}`}
      id={"work"}
    >
      <div className="flex relative w-full pl-10">
        <div
          className={
            "flex flex-row w-full justify-between shadow-inner bg-gradient-to-br from-black/10 to-gray-200/50 rounded-l-lg items-center"
          }
        >
          <div className="flex flex-col w-3/4 space-y-3 p-16">
            <h2 className={"flex text-2xl"}>Graylog API Security</h2>
            <h2 className="flex text-lg opacity-50">Full Stack</h2>
            <div className={"flex flex-row gap-2 text-sm"}>
              <IdleScrollArea
                axis="x"
                speed={500}
                idleDelay={3000}
                startDirection="forward"
                className="scrollbar-display-none w-[640px]"
              >
                {apiSkills.map((skill, index) => (
                  <div className="inline-block">
                    <span>{skill}</span>
                    {index !== apiSkills.length - 1 && <span>-</span>}
                  </div>
                ))}
              </IdleScrollArea>
            </div>
          </div>
          <button className={"relative group flex h-full py-1"}>
            <div className="flex h-full w-full p-4 justify-center items-center cursor-pointer shadow bg-gradient-to-br from-gray-200 to-gray-100 rounded-l-lg">
              <ChevronLeft size={"44px"} className={"flex"} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
