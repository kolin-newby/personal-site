import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
  const title = "Contact_Me...";
  const slackWebHook = process.env.REACT_APP_SLACKHOOK;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }
  }, [sent]);

  function sendButtonErrs() {
    let errors = [];
    if (!name.length > 0) errors.push("Please enter your name.");
    if (!email.length > 0) errors.push("Please enter an email address.");
    else if (!email.includes("@") || !email.includes("."))
      errors.push("Please enter a valid email address.");
    if (!subject.length > 0) errors.push("Please enter a subject.");
    if (!message.length > 0) errors.push("Please enter a message.");
    return errors;
  }

  function handleContactSubmit() {
    let msg = `{"text" : "New message from:\n${name}\n\nSubject:\n${subject}\n\nRespond to:\n${email}\n\n\n${message}"}`;
    if (slackWebHook === undefined) {
      console.log(
        `No webhook detected, development environment assumed.\nMessage not sent...\n\nWould have sent message as follows:\n${msg}`
      );
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setShowErrors(false);
      return;
    }

    let hermes = new XMLHttpRequest();
    hermes.open("POST", slackWebHook);

    // hermes.onload = () => console.log(hermes.responseText.replaceAll(slackWebHook, "[REDACTED]"));

    hermes.send(msg);
    //--------------------------
    setSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setShowErrors(false);
  }

  return (
    <div
      id={"contact"}
      className={
        "flex flex-grow flex-col min-h-screen items-center justify-center"
      }
    >
      <div className={"flex flex-col items-center justify-center w-full"}>
        <span
          className={
            "flex 2xl:text-6xl sm:text-5xl text-4xl mt-5 2xl:mt-0 justify-center font-extrabold pb-20"
          }
        >
          {title.split("").map((letter, index) => (
            <span
              key={"contact-title-" + letter + index}
              className={
                "cursor-default hover:text-transparent transition-all duration-75 " +
                "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                `from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2 ${
                  letter === "_" ? "invisible" : "visible"
                }`
              }
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          className={
            "flex lg:text-2xl text-lg w-2/3 items-center text-center justify-center"
          }
        >
          I'm open to any opportunities that may come my way, feel free to reach
          out!
        </span>
        <span
          className={
            "flex lg:text-2xl text-lg w-1/2 items-center justify-center font-bold bg-clip-text bg-gradient-to-r " +
            "from-theme-light-1 to-theme-light-2 text-transparent text-center"
          }
        >
          Let's build something incredible together!
        </span>
      </div>
      <div
        className={
          "flex relative flex-col lg:w-1/2 w-2/3 mt-20 text-xl lg:text-2xl space-y-5"
        }
      >
        <div
          className={`${
            sent ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 pointer-events-none absolute flex z-10 inset-0 bg-bg-light dark:bg-bg-dark bg-opacity-80 dark:bg-opacity-60 text-3xl font-bold justify-center items-center`}
        >
          Message Sent!
        </div>
        <div
          className={
            "flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-5"
          }
        >
          <div
            className={
              "flex lg:w-1/2 w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"
            }
          >
            <input
              id={"inputName"}
              className={
                "flex w-full bg-gray-300 dark:bg-dark-accent h-14 rounded p-5 text-center " +
                "focus:outline-none transform transition-transform origin-top focus:scale-y-95"
              }
              type={"text"}
              placeholder={"name"}
              maxLength={40}
              value={name}
              onChange={(input) => setName(input.target.value)}
            />
          </div>
          <div
            className={
              "flex lg:w-1/2 w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"
            }
          >
            <input
              id={"inputEmail"}
              className={
                "flex w-full bg-gray-300 dark:bg-dark-accent h-14 rounded p-5 text-center " +
                "focus:outline-none transform transition-transform origin-top focus:scale-y-95"
              }
              type={"email"}
              placeholder={"email"}
              maxLength={40}
              value={email}
              onChange={(input) => setEmail(input.target.value)}
            />
          </div>
        </div>
        <div
          className={
            "flex w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"
          }
        >
          <input
            id={"inputSubject"}
            className={
              "flex w-full bg-gray-300 dark:bg-dark-accent h-14 rounded p-5 text-center " +
              "focus:outline-none transform transition-transform origin-top focus:scale-y-95"
            }
            type={"text"}
            placeholder={"subject"}
            maxLength={100}
            value={subject}
            onChange={(input) => setSubject(input.target.value)}
          />
        </div>
        <div
          className={
            "flex w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"
          }
        >
          <textarea
            id={"inputMessage"}
            className={
              "flex-wrap w-full bg-gray-300 dark:bg-dark-accent h-48 rounded p-5 " +
              "focus:outline-none transform transition-transform origin-top focus:scale-y-98"
            }
            placeholder={"message"}
            value={message}
            maxLength={600}
            onChange={(input) => setMessage(input.target.value)}
          />
        </div>
      </div>
      <div className={"flex w-full justify-center"}>
        <button
          className={
            "relative px-5 py-3 mt-5 text-xl lg:w-1/6 font-bold text-bg-light dark:text-bg-dark rounded flex justify-center " +
            "shadow-lg " +
            `dark:shadow-blue-900 ${
              sendButtonErrs().length !== 0
                ? "opacity-50 text-bg-dark dark:text-bg-light bg-gray-300 dark:bg-gray-500/30 cursor-not-allowed"
                : "bg-gradient-to-r from-theme-light-1 to-theme-light-2 hover:shadow-xl hover:-translate-y-1 transform transition-all"
            }`
          }
          onClick={
            sendButtonErrs().length !== 0 ? null : () => handleContactSubmit()
          }
          onMouseEnter={() => setShowErrors(true)}
          onMouseLeave={() => setShowErrors(false)}
        >
          Submit
          <Transition
            show={showErrors && sendButtonErrs().length > 0}
            className={
              "absolute bottom-full left-1/2 mt-8 flex text-sm w-max transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-theme-dark-1 via-theme-dark-2 to-theme-dark-3"
            }
            enter={"transition-opacity duration-200"}
            enterFrom={"opacity-0"}
            enterTo={"opacity-100"}
            leave={"transition-opacity duration-300"}
            leaveFrom={"opacity-100"}
            leaveTo={"opacity-0"}
          >
            <div
              className={
                "flex flex-col w-full bg-bg-light dark:bg-bg-dark m-1 rounded-lg py-3 px-6"
              }
            >
              <ul className={"list-inside"}>
                {sendButtonErrs().map((err, index) => (
                  <li key={index + "-" + err}>
                    <span>
                      <FontAwesomeIcon
                        icon="circle-exclamation"
                        size={"sm"}
                        className={"mr-1.5 text-cyan-500"}
                      />
                      {err}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Transition>
        </button>
      </div>
    </div>
  );
}
