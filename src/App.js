import './App.css';
import React, {useState} from "react";
import Navbar from "./components/navbar";


function App() {

  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    {title: "About Myself", link: "about"},
    {title: "Skills", link: "skills"},
    {title: "Experience", link: "xp"},
    {title: "Resume", link: "resume"}
  ];

  function scrollTo(key: string) {
    let el = document.getElementById(key);
    el.scrollIntoView();
  }

  return (
      <div className={darkMode ? "dark" : ""}>
        <div className={"relative overflow-y-auto dark:text-white bg-bg-light dark:bg-bg-dark"}>
          <Navbar/>
          <div className={"relative w-full h-screen"}>
            <div className={"w-full absolute relative inset-x-0 top-0 bottom-1/2 h-1/2 border-b border-black dark:border-white bg-gradient-to-r from-theme-light-1/40 to-theme-light-2/40 dark:from-theme-dark-1 dark:to-theme-dark-2/70"}>
              <div className={"absolute inset-0 bg-gradient-to-b from-transparent to-bg-light dark:from-bg-dark dark:to-transparent"}/>
              <div className={"absolute dark:hidden z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 top-full w-96 h-96 opacity-80 bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:to-theme-dark-1 dark:from-theme-dark-2 rounded-full shadow-2xl animate-pulse-slow"}/>
              <div className={"group dark:hidden absolute relative z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 top-full w-80 h-80 bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:to-theme-dark-1 dark:from-theme-dark-2 rounded-full shadow-2xl"}>
                <div className={"absolute flex flex-col transition-opacity duration-1000 items-center justify-center inset-5 rounded-full"}>
                  <span className={"flex font-bold text-6xl drop-shadow-lg opacity-70"}>KOLIN</span>
                  <span className={"flex font-bold text-6xl drop-shadow-lg opacity-70"}>NEWBY</span>
                </div>
              </div>
              <div className={"group flex"}>
                <div id={"moon"} className={"hidden dark:block absolute flex -bottom-40 left-1/2 translate-x-10 translate-y-10"}/>
                <div className={"hidden dark:block absolute flex bottom-0 translate-y-1/2 -translate-x-10 left-1/2 transition-opacity duration-700"}>
                  <span className={"flex font-bold text-6xl drop-shadow-lg opacity-70"}>KOLIN</span>
                  <span className={"flex font-bold text-6xl drop-shadow-lg opacity-70"}>NEWBY</span>
                </div>
              </div>
            </div>
            <div className={"absolute top-1/2 inset-x-0 bottom-0 z-10 bg-opacity-40 bg-cyan-200 dark:bg-cyan-300 dark:bg-opacity-50 pointer-events-none"}/>
          </div>
          <div id={"about"} className={"flex"}>
              <div className={"sticky top-0 flex flex-col h-screen w-80"}>
                <div className={"flex flex-col items-center justify-center w-full h-full flex-none text-black dark:text-white divide-y divide-black dark:divide-white"}>
                  {
                    sections.map((sect) => (
                        <a key={sect.link + "-link"} onClick={() => scrollTo(sect.link)} className={"flex cursor-pointer text-lg justify-center items-center py-10 hover:py-12 hover:text-xl transition-all duration-300"}>
                          {sect.title}
                        </a>
                    ))
                  }
                </div>
              </div>
              <div className={"w-full z-20 overflow-y-scroll text-lg pl-5"}>
                <div id={"about"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>About Me</span>
                  <span className={"flex"}>kjlkjdshflk  sdjh flkjsdha f jsldhf  ;lksadjf h lkasdjfh </span>
                </div>
                <div id={"skills"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>Skills</span>
                  <span className={"flex"}>kjlkjdshflk  sdjh flkjsdha f jsldhf  ;lksadjf h lkasdjfh </span>
                </div>
                <div id={"edu"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>Education</span>
                  <span className={"flex"}>kjlkjdshflk  sdjh flkjsdha f jsldhf  ;lksadjf h lkasdjfh </span>
                </div>
                <div id={"xp"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>Job Experience</span>
                  <span className={"flex"}>kjlkjdshflk  sdjh flkjsdha f jsldhf  ;lksadjf h lkasdjfh </span>
                </div>
                <div id={"proj"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>Projects</span>
                  <span className={"flex"}>kjlkjdshflk  sdjh flkjsdha f jsldhf  ;lksadjf h lkasdjfh </span>
                </div>
                <div id={"resume"} className={"flex flex-col pb-96"}>
                  <span className={"flex text-4xl font-bold"}>Resume</span>
                  <span className={"flex"}>Please feel free to download a copy of my official resume!</span>
                  <span className={"relative flex w-44 h-12"}>
                            <a href={"functionalsample.pdf"} className={"transition-colors duration-1000 rounded z-10 absolute inset-0 flex items-center justify-center bg-bg-light hover:bg-gradient-to-r hover:from-theme-light-1 hover:to-theme-light-2"} download>Download Resume</a>
                            <div className={"rounded absolute -inset-1 flex bg-gradient-to-r from-theme-light-1 to-theme-light-2"}/>
                        </span>
                </div>
              </div>
            </div>
          </div>
      </div>
  );
}

export default App;
