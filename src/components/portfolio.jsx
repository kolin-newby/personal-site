import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { ArrowBigRight } from "lucide-react";

const Portfolio = ({ darkMode, className = "" }) => {
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
      className={`flex h-screen relative w-full items-center laptop:px-10 laptop:space-x-10 laptop:space-y-0 pt-4 laptop:pt-0 ${className}`}
      id={"work"}
    >
      <div
        className={
          "flex flex-col shadow-inner bg-gradient-to-br from-black/10 to-transparent rounded w-full px-4 py-6 space-y-2 items-center"
        }
      >
        <h2 className={"flex text-2xl"}>Graylog API Security</h2>
        <div className={"flex flex-row"}>
          <span>
            React - Node.js - TypeScript - JavaScript - HTML - CSS - SQL
          </span>
        </div>
        <div
          className={
            "flex h-[44px] w-[44px] rounded-[22px] bg-zinc-100 shadow-xl p-2 justify-center items-center cursor-pointer transition-all transform hover:rounded-xl animate-spin"
          }
        >
          <ArrowBigRight className={"flex"} size={"26px"} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
