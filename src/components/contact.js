import React, { useState } from "react";
import Follower from "./follower"
import ContactModal from "./contact-modal"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Contact({className="", touch}) {
    const [contactOpen, setContactOpen] = useState(false);
    const [followerActive, setFollowerActive] = useState(false);

  return (
      <div className={`flex flex-col h-screen ${className}`} id={"contact"}>
          <div
              className={"flex items-center h-full justify-center bg-gradient-to-bl from-transparent to-black/90 from-50% to-50% w-full relative"}
              onMouseEnter={() => setFollowerActive(true)}
              onMouseLeave={() => setFollowerActive(false)}
          >
              <Follower active={followerActive} setActive={setFollowerActive} modalOpen={contactOpen}
                        setModalOpen={setContactOpen}/>
              <span
                  className={"flex font-bold text-transparent laptop:text-8xl text-5xl w-full h-full items-center text-center bg-clip-text laptop:px-24 bg-gradient-to-tr from-gray-200 to-black/90 from-50% to-50%"}
              >
                Let's build<br/>&nbsp;&nbsp;&nbsp;something amazing<br/>&nbsp;together...
              </span>
              <button
                  onClick={() => setContactOpen(true)}
                  className={`absolute ${touch ? "flex" : "hidden"} bottom-28 left-0 w-full bg-transparent tap-target-bottom items-center transform -translate-x-1/2 justify-center text-white/20 text-3xl rounded-sm p-3 border-2 border-transparent font-bold`}
              >
                  tap
              </button>
              <button
                  onClick={() => setContactOpen(true)}
                  className={`absolute ${touch ? "flex" : "hidden"} laptop:hidden top-28 right-0 w-full bg-transparent tap-target-top items-center transform -translate-x-1/2 justify-center text-gray-900/20 text-3xl rounded-sm p-3 border-2 border-transparent font-bold`}
              >
                  tap
              </button>
              <ContactModal open={contactOpen} setOpen={setContactOpen}/>
          </div>
          <SocialLinks/>
      </div>
  );
}

function SocialLinks() {

    const [activeLink, setActiveLink] = useState("");

    const socialLinks = [
        {
            title: "GitHub",
            icon: "fa-brands fa-github",
            href: "https://github.com/kolin-newby"
        },
        {
            title: "LinkedIn",
            icon: "fa-brands fa-linkedin",
            href: "https://www.linkedin.com/in/knewby/"
        },
        {
            title: "kolin@knewby.io",
            icon: "fa-solid fa-envelope",
            href: "mailto:kolin@knewby.io"
        },
        {
            title: "Resume",
            icon: "fa-solid fa-file-lines",
            href: "/resume.pdf",
        }
    ]

    return (
        <div
            className={"flex w-full bg-black/90 laptop:h-44 h-20 text-white laptop:pl-20 px-8 laptop:pr-0 laptop:space-x-8 items-center justify-between laptop:justify-start"}
        >
            {socialLinks.map((link, index) => (
                <a
                    href={link.href}
                    rel={"noreferrer"}
                    download={link.title === "Resume" ? "resume_kolin_newby" : null}
                    target={link.title !== "Email" ? "_blank" : null}
                    className={`flex laptop:w-56 items-center justify-start laptop:space-x-3 cursor-pointer`}
                    onMouseEnter={() => setActiveLink(link.title)}
                    onMouseLeave={() => setActiveLink("")}
                >
                    <FontAwesomeIcon className={"text-3xl laptop:text-4xl"} icon={link.icon}/>
                    <span
                        className={`laptop:flex hidden transition-all duration-500 overflow-hidden text-lg ${activeLink === link.title ? "basis-48" : "basis-0"}`}>{link.title}</span>
                </a>
            ))}
        </div>
    )
}