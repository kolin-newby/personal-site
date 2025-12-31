import PhotoCarousel from "../components/photo-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IdleScrollArea from "../components/idle-scroll-area";
import TextHighlighterContainer from "../components/text-highlighter-container";
import Button from "../components/common/button";

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

  const allSkills = [
    { title: "Golang", icon: "fa-brands fa-golang" },
    { title: "JavaScript", icon: "fa-brands fa-js" },
    { title: "React", icon: "fa-brands fa-react" },
    { title: "Python", icon: "fa-brands fa-python" },
    { title: "HTML5", icon: "fa-brands fa-html5" },
    { title: "CSS3", icon: "fa-brands fa-css3" },
    { title: "Git", icon: "fa-brands fa-git-alt" },
    { title: "Docker", icon: "fa-brands fa-docker" },
    { title: "Java", icon: "fa-brands fa-java" },
    { title: "Linux", icon: "fa-brands fa-linux" },
    { title: "Hubspot", icon: "fa-brands fa-hubspot" },
    { title: "Ubuntu", icon: "fa-brands fa-ubuntu" },
    { title: "Github", icon: "fa-brands fa-github" },
    { title: "Confluence", icon: "fa-brands fa-confluence" },
    { title: "Bash", icon: "fa-solid fa-terminal" },
  ];

  return (
    <div
      id={"about"}
      className={`relative flex lg:h-screen h-full w-full flex-col lg:flex-row items-center ${className}`}
    >
      <div
        className={
          "flex flex-col items-center lg:h-full w-full lg:justify-center lg:space-y-0"
        }
      >
        <div
          className={
            "flex flex-col space-y-4 text-xs md:text-sm text-shadow p-6 lg:px-12 items-start justify-end max-w-[900px] lg:min-h-1/2 pb-4 pt-10 lg:pb-0 lg:pt-10"
          }
        >
          <TextHighlighterContainer
            className="flex flex-col space-y-2"
            terms={[
              "backend",
              "frontend",
              "API calls",
              "full-stack",
              "web applications",
              "hire me",
              "startup",
              "enterprise",
              "thousands of users",
            ]}
            caseSensitive
            holdAfterAllSec={10}
            perWordFillSec={0.45}
          >
            <span>
              I&#39;m a full-stack software engineer based in Denver. I have
              experience building performant, reliable, and user-focused web
              applications from the ground up. My background spans both startup
              and enterprise environments, with a focus on crafting clean,
              maintainable code and developing products that make complex
              systems intuitive to use.
            </span>
            <span>
              At Resurface Labs, I led the design and development of the user
              experience and user interface, working across backend
              infrastructure and frontend services to ship production-ready
              features. At Graylog, I collaborated with the core team across
              time zones to implement new features, build interfaces, and
              optimize API calls, improving performance and usability for
              thousands of users.
            </span>
            <span>
              I'm currently looking for my next role as a developer. Want to
              hire me?
            </span>
          </TextHighlighterContainer>

          <div className="flex justify-evenly items-center w-full pt-4 space-x-2">
            <Button
              buttonText="LinkedIn"
              href={"https://www.linkedin.com/in/knewby/"}
              icon={
                <FontAwesomeIcon
                  icon={"fa-brands fa-linkedin"}
                  className="size-5! md:size-7!"
                />
              }
            />
            <Button
              buttonText="GitHub"
              href={"https://github.com/kolin-newby"}
              icon={
                <FontAwesomeIcon
                  icon={"fa-brands fa-github"}
                  className="size-5! md:size-7!"
                />
              }
            />
            <Button
              buttonText="Resume"
              href={"/resume.pdf"}
              download={"resume_newby"}
              icon={
                <FontAwesomeIcon
                  icon={"fa-solid fa-file-lines"}
                  className="size-5! md:size-7!"
                />
              }
            />
          </div>
        </div>
        <div
          className={
            "flex w-full lg:w-auto lg:grow items-center justify-center"
          }
        >
          {/* ====================================================== */}
          <div
            className={
              "relative flex lg:hidden flex-col space-y-3 lg:max-w-[450px] w-full text-black/40 py-4 shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 lg:rounded-lg"
            }
          >
            <div key={"skills-row-all"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={50}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full h-full leading-0"
              >
                <div className="inline-flex items-center">
                  {allSkills.map((skill, index) => (
                    <div
                      key={`skill-all-${index}-${skill.title}`}
                      className={"mx-10 size-10 md:size-14 lg:size-16"}
                    >
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="block align-middle w-full! h-full!"
                      />
                    </div>
                  ))}
                </div>
              </IdleScrollArea>
            </div>
          </div>

          {/* single line skill scroller above ^ */}
          {/* triple line skill scroller below \/ */}

          <div
            className={
              "relative hidden lg:flex flex-col space-y-3 lg:max-w-[450px] w-full text-black/40 py-4 shadow-inner bg-linear-to-br from-black/10 to-gray-200/50 lg:rounded-lg"
            }
          >
            <div key={"skills-row-1"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={80}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full leading-0"
              >
                <div className="inline-flex items-center">
                  {skills1.map((skill, index) => (
                    <div
                      key={`skill-r1-${index}-${skill.title}`}
                      className={"mx-10 size-10 md:size-14 lg:size-16"}
                    >
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="block align-middle w-full! h-full!"
                      />
                    </div>
                  ))}
                </div>
              </IdleScrollArea>
            </div>
            <div key={"skills-row-2"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={60}
                idleDelay={2000}
                startDirection="backward"
                className="scrollbar-display-none w-full leading-0"
              >
                <div className="inline-flex items-center">
                  {skills2.map((skill, index) => (
                    <div
                      key={`skill-r2-${index}-${skill.title}`}
                      className={"mx-10 size-10 md:size-14 lg:size-16"}
                    >
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="block align-middle w-full! h-full!"
                      />
                    </div>
                  ))}
                </div>
              </IdleScrollArea>
            </div>
            <div key={"skills-row-3"} className={"overflow-hidden w-full"}>
              <IdleScrollArea
                infinite
                axis="x"
                minStepPx={1}
                speed={50}
                idleDelay={2000}
                startDirection="forward"
                className="scrollbar-display-none w-full h-full leading-0"
              >
                <div className="inline-flex items-center">
                  {skills3.map((skill, index) => (
                    <div
                      key={`skill-r3-${index}-${skill.title}`}
                      className={"mx-10 size-10 md:size-14 lg:size-16"}
                    >
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="block align-middle w-full! h-full!"
                      />
                    </div>
                  ))}
                </div>
              </IdleScrollArea>
            </div>
          </div>
          {/* ====================================================== */}
        </div>
      </div>
      <PhotoCarousel
        className={
          "flex lg:max-w-1/2 lg:min-w-[200px] w-full h-1/2 lg:h-full grow"
        }
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
