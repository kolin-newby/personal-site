import React, {useEffect, useState} from "react";
// require('dotenv').config();
export default function Contact() {
    const title = "Contact_Me...";
    const slackWebHook = process.env.SLACKHOOK;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (sent) {
            setTimeout(() => {
                setSent(false);
            }, 3000)
        }
    }, [sent])
    function handleContactSubmit() {
        // if (slackWebHook === undefined) return;

        let hermes = new XMLHttpRequest();
        hermes.open("POST", slackWebHook);
        hermes.setRequestHeader("Content-type", "application/json");

        hermes.onload = () => console.log(hermes.responseText);

        // let test = `{"text":"hello there..."}`
        let msg = `{"text" : "New website message from: ${name}<br>Subject: ${subject}<br>Respond to: ${email}<br><br>${message}"}`
        // hermes.send(msg);

        console.log(process.env);
        //--------------------------
        setSent(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    return(
        <div id={"contact"} className={"flex flex-grow flex-col min-h-screen items-center justify-center"}>
            <div className={"flex flex-col items-center justify-center w-full"}>
                <span
                    className={"flex 2xl:text-6xl text-5xl mt-5 2xl:mt-0 justify-center font-extrabold pb-20"}
                >
                        {title.split("").map((letter) => (
                            <span className={"cursor-default hover:text-transparent transition-all duration-75 " +
                                "hover:transform hover:-translate-y-3 bg-clip-text bg-gradient-to-r " +
                                `from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2 ${letter === "_" ? "invisible" : "visible"}`}>{letter}</span>
                        ))}
                    </span>
                <span className={"flex lg:text-2xl text-lg w-2/3 items-center text-center justify-center"}>
                    I am interested in freelance opportunities,
                    but if you have any other questions or ideas please feel free to let me know.
                </span>
                <span className={"flex lg:text-2xl text-lg w-1/2 items-center justify-center font-bold bg-clip-text bg-gradient-to-r " +
                    "from-theme-light-1 to-theme-light-2 text-transparent text-center"}>
                Let's build something incredible together!
                </span>
            </div>
            <div className={"flex relative flex-col lg:w-1/2 w-2/3 mt-20 text-xl lg:text-2xl space-y-5"}>
                <div className={`${sent ? "opacity-100" : "opacity-0"} transition-opacity duration-500 pointer-events-none absolute flex z-10 inset-0 bg-bg-light dark:bg-bg-dark bg-opacity-80 dark:bg-opacity-60 text-3xl font-bold justify-center items-center`}>Message Sent!</div>
                <div className={"flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-5"}>
                    <div className={"flex lg:w-1/2 w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"}>
                        <input
                            id={"inputName"}
                            className={"flex w-full bg-gray-300 dark:bg-gray-200 dark:bg-opacity-20 h-14 rounded p-5 text-center " +
                                "focus:outline-none transform transition-transform origin-top focus:scale-y-95"}
                            type={"text"}
                            placeholder={"name"}
                            value={name}
                            onChange={(input) => setName(input.target.value)}
                        />
                    </div>
                    <div className={"flex lg:w-1/2 w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"}>
                        <input
                            id={"inputEmail"}
                            className={"flex w-full bg-gray-300 dark:bg-gray-200 dark:bg-opacity-20 h-14 rounded p-5 text-center " +
                                "focus:outline-none transform transition-transform origin-top focus:scale-y-95"}
                            type={"email"}
                            placeholder={"email"}
                            value={email}
                            onChange={(input) => setEmail(input.target.value)}
                        />
                    </div>
                </div>
                <div className={"flex w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"}>
                    <input
                        id={"inputSubject"}
                        className={"flex w-full bg-gray-300 dark:bg-gray-200 dark:bg-opacity-20 h-14 rounded p-5 text-center " +
                            "focus:outline-none transform transition-transform origin-top focus:scale-y-95"}
                        type={"text"}
                        placeholder={"subject"}
                        value={subject}
                        onChange={(input) => setSubject(input.target.value)}
                    />
                </div>
                <div className={"flex w-full bg-gradient-to-r from-theme-light-1 to-theme-light-2 rounded"}>
                    <textarea
                        id={"inputMessage"}
                        className={"flex-wrap w-full bg-gray-300 dark:bg-gray-200 dark:bg-opacity-20 h-48 rounded p-5 " +
                            "focus:outline-none transform transition-transform origin-top focus:scale-y-98"}
                        placeholder={"message"}
                        value={message}
                        onChange={(input) => setMessage(input.target.value)}
                    />
                </div>
            </div>
            <button className={"px-5 py-3 mt-5 text-xl lg:w-1/6 font-bold text-bg-light dark:text-bg-dark rounded flex justify-center " +
                "shadow-lg " +
                `dark:shadow-blue-900 ${(name === "" || email === "" || subject === "" || message === "") ?
                    "opacity-50 text-bg-dark dark:text-bg-light cursor-no-drop" :
                    "bg-gradient-to-r from-theme-light-1 to-theme-light-2 hover:shadow-xl hover:-translate-y-1 transform transition-all transform transition-all"}`}
                    disabled={name === "" || email === "" || subject === "" || message === ""}
                    onClick={() => handleContactSubmit()}
                    title={(name === "" || email === "" || subject === "" || message === "") ? "Please fill out all fields above." : null}
            >
                Submit
            </button>
        </div>
    )
}
