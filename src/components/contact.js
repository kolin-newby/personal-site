import React, { useState } from "react";
import Follower from "./follower"
import ContactModal from "./contact-modal"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Contact({className=""}) {
    const [contactOpen, setContactOpen] = useState(false);
    const [followerActive, setFollowerActive] = useState(false);

  return (
      <div className={`flex flex-col h-screen ${className}`} id={"contact"}>
          <div
              className={"flex items-center h-full justify-center bg-gradient-to-bl from-transparent to-black/90 from-50% to-50% w-full relative"}
              onMouseEnter={() => setFollowerActive(true)}
              onMouseLeave={() => setFollowerActive(false)}
          >
              <Follower active={followerActive} setActive={setFollowerActive} modalOpen={contactOpen} setModalOpen={setContactOpen}/>
              <span
                  className={"flex font-bold text-transparent text-8xl w-full h-full items-center bg-clip-text px-24 bg-gradient-to-tr from-gray-200 to-black/90 from-50% to-50%"}
              >
                Let's build<br/>&nbsp;&nbsp;&nbsp;something amazing<br/>&nbsp;together...
            </span>
              <ContactModal open={contactOpen} setOpen={setContactOpen}/>
          </div>
          <SocialLinks/>
      </div>
  );
}

function SocialLinks({}) {

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
            className={"flex w-full bg-black/90 h-44 text-white pl-20 space-x-8 items-center"}
        >
            {socialLinks.map((link, index) => (
                <a
                    href={link.href}
                    rel={"noreferrer"}
                    download={link.title === "Resume" ? "resume_kolin_newby" : null}
                    target={link.title !== "Email" ? "_blank" : null}
                    className={`flex w-56 items-center justify-start space-x-3 cursor-pointer`}
                    onMouseEnter={() => setActiveLink(link.title)}
                    onMouseLeave={() => setActiveLink("")}
                >
                    <FontAwesomeIcon size={"2x"} icon={link.icon}/>
                    <span
                        className={`flex transition-all duration-500 overflow-hidden text-lg ${activeLink === link.title ? "basis-48" : "basis-0"}`}>{link.title}</span>
                </a>
            ))}
        </div>
    )
}