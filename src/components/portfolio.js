import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Transition} from "@headlessui/react";

export default function Portfolio({ darkMode, className="" }) {
  const [activeGraySec, setActiveGraySec] = useState(1);

  const graylogPhotos = [
      {
          src: "/img/gray_api_sec_1.png",
          alt: "graylog api security 1"
      },
      {
          src: "/img/gray_api_sec_2.png",
          alt: "graylog api security 2"
      },
      {
          src: "/img/gray_api_sec_3.png",
          alt: "graylog api security 3"
      }
  ]

    return (
        <div className={`flex h-screen w-full items-center laptop:px-10 laptop:space-x-10 laptop:space-y-0 pt-4 laptop:pt-0 ${className}`} id={"work"}>
            <div
                className={"shadow-lg hidden laptop:flex relative laptop:flex-col justify-center space-y-3 p-3 basis-1/2 text-sm bg-gradient-to-bl from-[#43e4ac] via-[#9368fe] to-[#16c5f5] overflow-hidden rounded-sm"}
            >
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span className={"font-bold text-xl"}>Graylog API Security</span>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                      Graylog API Security is the ultimate solution for end-to-end API threat monitoring, detection, and response.
                      It offers a robust, data driven user experience that allows you to intuitively navigate mass amounts of stored data and see emerging trends in
                      your API's usage and performance.
                    </span>
                </div>
                <div className={"flex relative rounded-sm group overflow-hidden"}>
                    {graylogPhotos.map((photo, index) => (
                        <Transition
                            show={activeGraySec === index+1}
                        >
                            <img src={photo.src} alt={photo.alt} className={"flex"} />
                        </Transition>
                    ))}
                    <div
                        className={"absolute cursor-pointer flex bg-black/50 w-10 top-0 bottom-0 right-0 rounded-r-sm text-white " +
                            "items-center justify-center transition-transform duration-500 transform translate-x-10 group-hover:translate-x-0"}
                        onClick={activeGraySec === 3 ? () => setActiveGraySec(1) : () => setActiveGraySec(activeGraySec+1)}
                    >
                        <FontAwesomeIcon
                            size={"xl"}
                            icon={"angle-right"}
                        />
                    </div>
                    <div
                        className={"absolute cursor-pointer flex bg-black/50 w-10 top-0 bottom-0 left-0 rounded-r-sm text-white " +
                        "items-center justify-center transition-transform duration-500 transform -translate-x-10 group-hover:translate-x-0"}
                        onClick={activeGraySec === 1 ? () => setActiveGraySec(3) : () => setActiveGraySec(activeGraySec-1)}
                    >
                        <FontAwesomeIcon
                            size={"xl"}
                            icon={"angle-left"}
                        />
                    </div>
                    <div className={"absolute flex bg-black/50 px-4 bottom-3 right-1/2 transform translate-x-1/2 rounded-r-sm " +
                        "text-white items-center justify-center space-x-4 transform transition-transform duration-500 translate-y-7 group-hover:translate-y-0"}>
                        {graylogPhotos.map((_, index) => (
                            <div className={`flex rounded-full border-2 border-white w-3 h-3 ${activeGraySec === index+1 ? "bg-white" : "bg-transparent"}`}/>
                        ))}
                    </div>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                      I lead the overall maintenance and development of the user interface and experience for Graylog API Security.
                        I utilize React.js, TypeScript, HTML, CSS, and SQL to develop in the frontend and I regularly assist my team members with backend development in Java.
                    </span>
                </div>
            </div>
            <div
                className={"shadow-lg hidden laptop:flex laptop:flex-col justify-center space-y-3 p-3 basis-1/2 text-sm bg-gradient-to-br from-orange-400 via-pink-600 to-purple-400 overflow-hidden rounded-sm"}>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span className={"font-bold text-xl"}>Golang API Logger</span>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                        The logger-go project is a high performance, low over-head, open source API transaction logger written in Golang. Originally designed to be inserted directly
                        into the API source code, it logs the API's full requests and responses and stores them in the Graylog API Security database to be later queried.
                        It has since been expanded to work inside API gateways like Tyk or Kong, as well as in common cloud platforms such as AWS or Azure.
                    </span>
                </div>
                <div className={"flex font-bold items-center justify-center p-2 rounded-sm bg-gray-200"}>
                    <img src={"/img/source_code_logger_diagram.svg"} alt={"source code diagram"}/>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                          I was directly responsible for creating the logger's thorough system of unit tests. Throughout the last few years, I have finished
                          the loggers initial development, performed extensive load testing, and help make major improvements to the performance of the software via the implementation
                          of asynchronous go routines and JSON batching.
                    </span>
                </div>
            </div>
            <MobilePortfolio/>
        </div>
    );
}

function MobilePortfolio({className = "flex laptop:hidden"}) {
    const [active, setActive] = useState(null);
    const [activeGraySec, setActiveGraySec] = useState(1);

    const graylogPhotos = [
        {
            src: "/img/gray_api_sec_1.png",
            alt: "graylog api security 1"
        },
        {
            src: "/img/gray_api_sec_2.png",
            alt: "graylog api security 2"
        },
        {
            src: "/img/gray_api_sec_3.png",
            alt: "graylog api security 3"
        }
    ]

    return (
        // flex h-screen w-full items-center laptop:px-10 px-4 laptop:space-x-10 space-y-4 laptop:space-y-0 pt-4 laptop:pt-0
        <div className={`${className} flex-col w-full h-full justify-center items-center space-y-3 overflow-y-hidden`}>
            <div
                className={`flex flex-col transition-all duration-500 ${active === 0 ? "max-h-[100vh]" : "max-h-14"} shadow mx-2 laptop:flex-col justify-start space-y-2 p-2 text-sm bg-gradient-to-bl from-[#43e4ac] via-[#9368fe] to-[#16c5f5] overflow-hidden rounded-sm`}
            >
                <div
                    onClick={() => {
                        if(active === 0) setActive(null);
                        else setActive(0);
                    }}
                    className={"flex h-10 p-2 rounded-sm bg-gray-200 items-center justify-between cursor-pointer"}
                >
                    <span className={"font-bold text-xl"}>Graylog API Security</span>
                    <FontAwesomeIcon icon={active === 0 ? "times" : "chevron-down"} size={"xl"} className={active === 0 ? "animate-wiggle" : ""}/>
                </div>
                <div className={"flex p-2 rounded-sm bg-gray-200"}>
                    <span>
                      Graylog API Security is the ultimate solution for end-to-end API threat monitoring, detection, and response.
                      It offers a robust, data driven user experience that allows you to intuitively navigate mass amounts of stored data and see emerging trends in
                      your API's usage and performance.
                    </span>
                </div>
                <div className={"flex relative rounded-sm group overflow-hidden"}>
                    {graylogPhotos.map((photo, index) => (
                        <Transition
                            show={activeGraySec === index + 1}
                        >
                            <img src={photo.src} alt={photo.alt} className={"flex"}/>
                        </Transition>
                    ))}
                    <div
                        className={"absolute cursor-pointer flex bg-black/50 w-8 top-0 bottom-0 right-0 rounded-r-sm text-white " +
                            "items-center justify-center"}
                        onClick={activeGraySec === 3 ? () => setActiveGraySec(1) : () => setActiveGraySec(activeGraySec + 1)}
                    >
                        <FontAwesomeIcon
                            size={"xl"}
                            icon={"angle-right"}
                        />
                    </div>
                    <div
                        className={"absolute cursor-pointer flex bg-black/50 w-8 top-0 bottom-0 left-0 rounded-r-sm text-white " +
                            "items-center justify-center"}
                        onClick={activeGraySec === 1 ? () => setActiveGraySec(3) : () => setActiveGraySec(activeGraySec - 1)}
                    >
                        <FontAwesomeIcon
                            size={"xl"}
                            icon={"angle-left"}
                        />
                    </div>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                      I lead the overall maintenance and development of the user interface and experience for Graylog API Security.
                        I utilize React.js, TypeScript, HTML, CSS, and SQL to develop in the frontend and I regularly assist my team members with backend development in Java.
                    </span>
                </div>
            </div>
            <div
                className={`shadow flex flex-col transition-all duration-500 ${active === 1 ? "max-h-[100vh]" : "max-h-14"} justify-start space-y-2 p-2 mx-2 text-sm bg-gradient-to-br from-orange-400 via-pink-600 to-purple-400 overflow-hidden rounded-sm`}>
                <div
                    onClick={() => {
                        if (active === 1) setActive(null);
                        else setActive(1);
                    }}
                    className={"flex h-10 p-2 rounded-sm bg-gray-200 items-center justify-between cursor-pointer"}
                >
                    <span className={"font-bold text-xl"}>Golang API Logger</span>
                    <FontAwesomeIcon icon={active === 1 ? "times" : "chevron-down"} size={"xl"}
                                     className={active === 1 ? "animate-wiggle" : ""}/>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                        The logger-go project is a high performance, low over-head, open source API transaction logger written in Golang. Originally designed to be inserted directly
                        into the API source code, it logs the API's full requests and responses and stores them in the Graylog API Security database to be later queried.
                        It has since been expanded to work inside API gateways like Tyk or Kong, as well as in common cloud platforms such as AWS or Azure.
                    </span>
                </div>
                <div className={"flex font-bold items-center justify-center p-2 rounded-sm bg-gray-200"}>
                    <img src={"/img/source_code_logger_diagram.svg"} alt={"source code diagram"}/>
                </div>
                <div className={"flex p-2 h-max rounded-sm bg-gray-200"}>
                    <span>
                          I was directly responsible for creating the logger's thorough system of unit tests. Throughout the last few years, I have finished
                          the loggers initial development, performed extensive load testing, and help make major improvements to the performance of the software via the implementation
                          of asynchronous go routines and JSON batching.
                    </span>
                </div>
            </div>
        </div>
    )
}
