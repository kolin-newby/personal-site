import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { ArrowBigRight, EllipsisVertical } from "lucide-react";

const WorkPage = ({ darkMode, className = "" }) => {
  const [activeGraySec, setActiveGraySec] = useState(1);

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

  return (
    <div
      className={`flex flex-col h-screen relative w-full items-center justify-center space-y-6 ${className}`}
      id={"work"}
    >
      <div className="flex relative w-full pl-10">
        <div
          className={
            "flex flex-row w-full justify-between shadow-inner bg-gradient-to-br from-black/10 to-zinc-200/50 rounded-l-lg p-16 items-center"
          }
        >
          <div className="flex flex-col w-3/4">
            <h2 className={"flex text-2xl"}>Graylog API Security</h2>
            <div className={"flex flex-row"}>
              <span>
                React - Node.js - TypeScript - JavaScript - HTML - CSS - SQL
              </span>
            </div>
          </div>
          <div>
            <EllipsisVertical
              size={"48px"}
              className="text-black/40 bg-clip-text "
            />
          </div>
          <div
            className={
              "absolute group right-0 inset-y-1/2 -translate-y-1/2 w-[200px] h-full flex"
            }
          >
            <div className="flex h-full w-full rounded-l-lg bg-zinc-200/50 shadow-inner p-2 justify-center items-center cursor-pointer transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
              <ArrowBigRight className={"flex"} size={"40px"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
