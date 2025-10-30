import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactModal = ({ open, setOpen }) => {
  const slackWebHook = process.env.REACT_APP_SLACKHOOK;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 3000);
    }
  }, [sent, setOpen, setSent]);

  function checkForErrors() {
    let tmp = [];

    if (!name.length > 0) tmp.push("name");

    if (!email.length > 0) tmp.push("email");
    else if (!email.includes("@") || !email.includes("."))
      tmp.push("valid_email");

    if (!message.length > 0) tmp.push("message");

    setErrors(tmp);
  }

  function handleContactSubmit() {
    let msg = `{"text" : "New message from:\n${name}\n\n${message}\n\nRespond to:\n${email}"}`;
    if (slackWebHook === undefined) {
      console.log(
        `No webhook detected, development environment assumed.\nMessage not sent...\n\nWould have sent message as follows:\n${msg}`
      );
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setShowErrors(false);
      return;
    }

    let hermes = new XMLHttpRequest();
    hermes.open("POST", slackWebHook);

    hermes.send(msg);
    //--------------------------
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setShowErrors(false);
  }

  return (
    <Transition show={open}>
      <div className={"absolute inset-0 w-full h-full"}>
        <div
          className={
            "absolute inset-5 lg:inset-20 border border-black flex flex-row " +
            "items-center justify-center bg-gray-300 rounded-lg overflow-hidden"
          }
        >
          <div
            className={"flex absolute top-10 left-10 cursor-pointer"}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon size={"2xl"} icon={"times"} />
          </div>
          <div
            className={
              "flex relative flex-col w-2/3 h-2/3 text-xl lg:text-2xl items-center justify-center space-y-6"
            }
          >
            <div
              className={`${
                sent ? "opacity-100" : "opacity-0"
              } transition-opacity pointer-events-none duration-500 bg-gray-300/80 absolute flex z-10 -inset-10 text-3xl font-bold justify-center items-center`}
            >
              Your message was sent!
            </div>
            <div
              className={
                "flex w-full rounded-lg shadow-xl p-2 border border-black items-center justify-center"
              }
            >
              <input
                id={"inputName"}
                className={"bg-transparent w-full"}
                type={"text"}
                placeholder={"name/company"}
                maxLength={40}
                value={name}
                onChange={(input) => {
                  setName(input.target.value);
                  checkForErrors();
                }}
              />
              {showErrors && errors.includes("name") && (
                <FontAwesomeIcon
                  icon={"exclamation-circle"}
                  className={"flex text-base text-red-600"}
                />
              )}
            </div>
            <div
              className={
                "flex w-full rounded-lg shadow-xl p-2 border border-black items-center justify-center"
              }
            >
              <input
                id={"inputEmail"}
                className={"bg-transparent w-full"}
                type={"email"}
                placeholder={"email"}
                maxLength={40}
                value={email}
                onChange={(input) => {
                  setEmail(input.target.value);
                  checkForErrors();
                }}
              />
              {showErrors && errors.includes("email") && (
                <FontAwesomeIcon
                  icon={"exclamation-circle"}
                  className={"flex text-base text-red-600"}
                />
              )}
              {showErrors && errors.includes("valid_email") && (
                <FontAwesomeIcon
                  icon={"exclamation-circle"}
                  className={"flex text-base text-amber-500"}
                />
              )}
            </div>
            <div
              className={
                "flex w-full rounded-lg shadow-xl p-2 border border-black items-center justify-center"
              }
            >
              <textarea
                id={"inputMessage"}
                className={"bg-transparent w-full text-base max-h-40 h-40"}
                placeholder={"your message"}
                value={message}
                maxLength={600}
                onChange={(input) => {
                  setMessage(input.target.value);
                  checkForErrors();
                }}
              />
              {showErrors && errors.includes("message") && (
                <FontAwesomeIcon
                  icon={"exclamation-circle"}
                  className={"flex text-base text-red-600"}
                />
              )}
            </div>
            {showErrors && errors.length > 1 && (
              <div
                className={
                  "flex w-full text-red-600 text-base items-center space-x-2 justify-center"
                }
              >
                <FontAwesomeIcon
                  icon={"exclamation-circle"}
                  size={"sm"}
                  className={"flex"}
                />
                <span className={"flex"}>missing required fields!</span>
              </div>
            )}
            {showErrors &&
              errors.length === 1 &&
              errors.includes("valid_email") && (
                <div
                  className={
                    "flex w-full text-amber-500 text-base items-center space-x-2 justify-center"
                  }
                >
                  <FontAwesomeIcon
                    icon={"exclamation-circle"}
                    size={"sm"}
                    className={"flex"}
                  />
                  <span className={"flex"}>invalid email address!</span>
                </div>
              )}
            <div className={"flex w-full justify-end items-center align-end"}>
              <button
                className={`relative text-xl font-bold rounded-lg p-2 border border-black`}
                onClick={
                  errors.length !== 0
                    ? () => setShowErrors(true)
                    : () => handleContactSubmit()
                }
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default ContactModal;
