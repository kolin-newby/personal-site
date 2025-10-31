import PhotoCarousel from "../components/photo-carousel";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutPage = ({ className = "" }) => {
  const skills1 = [
    { title: "Golang", icon: "fa-brands fa-golang" },
    { title: "JavaScript", icon: "fa-brands fa-js" },
    { title: "React", icon: "fa-brands fa-react" },
    { title: "Python", icon: "fa-brands fa-python" },
    { title: "HTML5", icon: "fa-brands fa-html5" },
  ];
  const skills2 = [
    { title: "CSS3", icon: "fa-brands fa-css3" },
    { title: "Git", icon: "fa-brands fa-git-alt" },
    { title: "Docker", icon: "fa-brands fa-docker" },
    { title: "Java", icon: "fa-brands fa-java" },
    { title: "Linux", icon: "fa-brands fa-linux" },
  ];
  const skills3 = [
    { title: "Hubspot", icon: "fa-brands fa-hubspot" },
    { title: "Ubuntu", icon: "fa-brands fa-ubuntu" },
    { title: "Github", icon: "fa-brands fa-github" },
    { title: "Confluence", icon: "fa-brands fa-confluence" },
    { title: "Bash", icon: "fa-solid fa-terminal" },
  ];

  return (
    <div
      id={"about"}
      className={`relative flex lg:h-screen h-full flex-col lg:flex-row items-center ${className}`}
    >
      <div
        className={
          "flex flex-col items-center lg:h-full lg:w-1/2 w-full lg:justify-center"
        }
      >
        <div
          className={
            "flex items-center justify-center w-full lg:h-1/2 pb-4 pt-10 lg:py-0"
          }
        >
          <div
            className={
              "flex lg:w-3/5 w-4/5 rounded-lg bg-gradient-to-br from-orange-500 via-purple-400 to-red-400 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
            }
          >
            <span
              className={
                "flex bg-gray-200 rounded-lg w-full h-full m-0.5 px-3 py-2 text-sm lg:text-base"
              }
            >
              I love creating things and seeing the world from new perspectives.
              Besides software development, my passion is in photography and the
              great outdoors!
              <br />
              <br />I have built robust, data-driven UIs using React.js and
              developed API logging software using Golang. My experience spans
              the full stack and I am eager to keep learning and growing my
              skills!
            </span>
          </div>
        </div>
        <div className={"flex w-full items-center justify-center lg:h-1/2"}>
          <div
            className={
              "grid grid-rows-3 gap-8 lg:w-2/3 w-full lg:h-3/4 text-black/40"
            }
          >
            <div
              key={"skills-row-1"}
              className={"flex row-span-1 w-full h-full overflow-hidden"}
            >
              <div
                key={"skills-r1-1"}
                className={"scroll-left-container-start-1"}
              >
                {skills1.map((skill, index) => (
                  <>
                    <div
                      key={`skills1-first-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <div className={"text-transparent"}>{skill.title}</div>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
              <div
                key={"skills-r1-2"}
                className={"scroll-left-container-end-1"}
              >
                {skills1.map((skill, index) => (
                  <>
                    <div
                      key={`skills1-second-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <span className={"text-transparent"}>{skill.title}</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
            </div>
            <div
              key={"skills-row-2"}
              className={
                "flex row-span-1 w-full h-full justify-end overflow-hidden"
              }
            >
              <div key={"skills-r2-1"} className={"scroll-right-container-end"}>
                {skills2.map((skill, index) => (
                  <>
                    <div
                      key={`skills2-first-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <span className={"text-transparent"}>{skill.title}</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
              <div
                key={"skills-r2-2"}
                className={"scroll-right-container-start"}
              >
                {skills2.map((skill, index) => (
                  <>
                    <div
                      key={`skills2-second-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <span className={"text-transparent"}>{skill.title}</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
            </div>
            <div
              key={"skills-row-3"}
              className={"flex row-span-1 w-full h-full overflow-hidden"}
            >
              <div
                key={"skills-r3-1"}
                className={"scroll-left-container-start-2"}
              >
                {skills3.map((skill, index) => (
                  <>
                    <div
                      key={`skills3-first-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <span className={"text-transparent"}>{skill.title}</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
              <div
                key={"skills-r3-2"}
                className={"scroll-left-container-end-2"}
              >
                {skills3.map((skill, index) => (
                  <>
                    <div
                      key={`skills3-second-${index}`}
                      className={
                        "flex items-center h-full justify-center relative text-3xl text-nowrap font-bold"
                      }
                    >
                      <FontAwesomeIcon
                        className={"absolute inset-0 w-full h-full"}
                        icon={skill.icon}
                      />
                      <span className={"text-transparent"}>{skill.title}</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PhotoCarousel
        imageSourceList={[
          "https://s1.darkroom.com/x0bhc9o374iyukfue2r0w16eylx6",
          "https://s2.darkroom.com/j62muwmn0qscmt0vrdlizmtod0nc",
          "https://s0.darkroom.com/rb69qelblbux7vzc6z96tx8zqq5n",
          "https://s1.darkroom.com/vya81fp2tnfae5mg7tjm6ed1t87w",
          "https://s3.darkroom.com/syt12jq96c9jxcw7etw93xplnpr6",
        ]}
      />
    </div>
  );
};

export default AboutPage;
