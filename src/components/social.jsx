import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Social = ({ darkMode, setDarkMode }) => {
  const mediaLinks = [
    {
      link: "https://www.linkedin.com/in/knewby/",
      icon: ["fab", "linkedin"],
      name: "linkedin",
      title: "see my LinkedIn",
      size: "xl",
    },
    {
      link: "https://github.com/kolin-newby",
      icon: ["fab", "github"],
      name: "github",
      title: "see my Github",
      size: "xl",
    },
    {
      link: "/resume.pdf",
      icon: "file-lines",
      name: "resume",
      title: "See my resume",
      size: "xl",
    },
  ];

  return (
    <div className={"absolute left-0 bottom-0 flex p-3 space-x-3 z-20"}>
      {mediaLinks.map((link) => (
        <a
          key={link.name + "-link"}
          className={
            "flex transition-transform transform scale-100 hover:scale-125"
          }
          href={link.link}
          title={link.title}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <FontAwesomeIcon icon={link.icon} size={link.size} />
        </a>
      ))}
    </div>
  );
};

export default Social;
