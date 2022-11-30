export default function Resume({darkMode}) {
    return (
        <div lang="en" className="m-8">
            <div
                className="fixed z-50 right-0 top-0 flex pb-12 pl-8 rounded-bl-5xl bg-gradient-to-bl from-white via-transparent to-transparent no-print">
                <button
                    id="pdf_btn"
                    className="flex mr-8 mt-12 text-xl py-2 px-4 transition-all rounded-sm bg-gradient-to-l from-blue-600 via-cyan-600 to-emerald-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    type="button"
                    onClick="printPDF()"
                >
                    Print PDF
                </button>
            </div>
            <section id="intro" className="mb-2">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full justify-start my-2">
                        <span className="flex text-6xl font-extrabold">KOLIN NEWBY</span>
                        <span className="text-2xl font-bold">Software Developer</span>
                    </div>
                    <div
                        className="flex w-full h-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 rounded-sm"
                    ></div>
                </div>
            </section>
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-9 p-6 pl-0 pt-0 space-y-2">
                    <section id="work">
                        <div className="flex flex-col">
        <span
            className="text-2xl font-bold mb-2 py-1 w-full text-center bg-gray-200/80 rounded-sm"
        >EXPERIENCE</span
        >
                            <div
                                id="resurface_xp"
                                className="flex flex-col pb-6 border-l-2 border-gray-300 rounded-tl-lg"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
                                    <span className="pl-2">Software Engineer, Resurface Labs</span>
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        June 2021 - Currently Employed
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Lead maintenance and development of the product UI, running on
                                        <span className="font-bold">Node.js</span> using
                                        <span className="font-bold">React</span> with
                                        <span className="font-bold">TypeScript</span> and
                                        <span className="font-bold">JavaScript</span>
                                    </li>
                                    <li>
                                        Work with backend components to optimize
                                        <span className="font-bold">SQL</span> queries, system latency,
                                        and overall performance given large data sets
                                    </li>
                                    <li>
                                        Assist in the development and maintenance of open-source
                                        logging software in the
                                        <span className="font-bold">Go</span> programming language, which
                                        utilizes go routines for
                                        <span className="font-bold">asynchronous</span>, background http
                                        submission
                                    </li>
                                    <li>
                                        Assist in development of integrated unit tests for the Go
                                        logger mentioned above
                                    </li>
                                    <li>
                                        Develop and maintain a test
                                        <span className="font-bold">API</span> for Go logger that used
                                        Golang, Gorilla mux, and
                                        <span className="font-bold">GraphQL</span>
                                    </li>
                                    <li>
                                        Coordinate efforts with fellow engineers to develop supporting
                                        software for <span className="font-bold">AWS</span> logging
                                    </li>
                                </ul>
                            </div>
                            <div
                                id="bookstore_xp"
                                className="flex flex-col border-l-2 border-gray-300 pb-6"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
                                    <span className="pl-2">Technology Lead, CU Boulder Bookstore</span>
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        August 2017 - May 2021
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Develop and maintain display website for selling 3D prints
                                        using <span className="font-bold">HTML/CSS</span> and
                                        <span className="font-bold">Express</span> framework
                                    </li>
                                    <li>
                                        Scheduled, trained, and supervised other technology desk employees
                                    </li>
                                    <li>
                                        Maintained smooth operation of 3D printers to produce customer
                                        prints and parts for the sales floor
                                    </li>
                                </ul>
                            </div>
                            <div
                                id="ba_xp"
                                className="flex flex-col border-l-2 border-gray-300 rounded-bl-lg"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
        <span className="pl-2"
        >Assistant Engineer, Colorado Airline Services</span
        >
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        June 2016 - July 2019
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Assisted the engineer in inspection and maintenance of major
                                        Boeing 747 aircraft systems both mechanical & electronic
                                    </li>
                                    <li>
                                        Evaluated and resolved any non-critical, technical issues in the
                                        cabin area of the aircraft
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section id="projects">
                        <div className="flex flex-col">
        <span
            className="text-2xl font-bold mb-2 py-1 w-full text-center bg-gray-200/80 rounded-sm"
        >PROJECTS</span
        >
                            <div
                                id="wordzilla_proj"
                                className="flex flex-col border-l-2 border-gray-300 rounded-tl-lg pb-6"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
                                    <span className="pl-2">WordZilla, Personal Project</span>
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        August 2022 - Present
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Developing a SASS application that generates marketing copy using a custom <span
                                        className="font-bold">REST API</span> powered by OpenAI's GPT-3
                                    </li>
                                    <li>
                                        Developing an application front end using <span
                                        className="font-bold">PHP</span>, <span className="font-bold">HTML/CSS</span>,
                                        and <span className="font-bold">Tailwind CSS</span>; then deploying app on
                                        Digital Ocean
                                    </li>
                                </ul>
                            </div>
                            <div
                                id="personal_site_proj"
                                className="flex flex-col border-l-2 border-gray-300 pb-6"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
                                    <span className="pl-2">Professional Website, Personal Project</span>
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        July 2022 - December 2021
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Built a site for professional representation and as a
                                        landing page for possible freelance opportunities. Site uses
                                        <span className="font-bold">Node.js</span>,
                                        <span className="font-bold">React</span>,
                                        <span className="font-bold">JavaScript</span>,
                                        <span className="font-bold">CSS</span>, and
                                        <span className="font-bold">Tailwind CSS</span>.
                                    </li>
                                </ul>
                            </div>
                            <div
                                id="capstone_proj"
                                className="flex flex-col border-l-2 border-gray-300 rounded-bl-lg"
                            >
                                <div className="flex flex-col text-xl font-bold w-max">
                                    <span className="pl-2">API Logger, Capstone Project</span>
                                    <hr className="h-0.5 w-full bg-gray-300 rounded-sm"/>
                                    <span className="text-gray-500 text-base text-start pl-2 relative">
        <div
            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
        >
        <i className="fa-solid fa-play text-gray-300"></i>
        </div>
        August 2020 - April 2021
        </span>
                                </div>
                                <ul className="list-disc list-inside ml-8 text-lg mt-3 space-y-1.5">
                                    <li>
                                        Created <span className="font-bold">open source</span>,
                                        <span className="font-bold">Go</span> based, API logging software
                                        in association with Resurface Labs in Boulder
                                    </li>
                                    <li>
                                        Was individually responsible for creating
                                        <span className="font-bold">unit tests</span> for the logging
                                        system as well as documenting my teams progress throughout the
                                        project
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div
                    className="relative col-span-3 flex flex-col p-6 bg-gray-200/80 rounded-sm space-y-16 items-center justify-start"
                >
                    <!-- <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-600 via-teal-400 to-emerald-600 rounded-sm"></div> -->
                    <section id="contact" className="flex flex-col">
                        <div className="flex flex-col justify-center items-center space-y-4">
        <span className="flex font-bold text-2xl justify-center">
        CONTACT INFO
        </span>
                            <hr className="h-0.5 w-5/6 bg-gray-300 rounded-sm"/>
                            <div className="flex w-full justify-center items-center">
                                <!-- wide width list -->
                                <ul
                                    className="hidden min-[2300px]:grid grid-cols-1 gap-2 grid-cols-2 w-max text-xl"
                                >
                                    <li className="text-end mr-4">
                                        <i className="fa-solid fa-earth-americas mr-1.5"></i>
                                        <span>Boulder, Colorado</span>
                                    </li>
                                    <li className="">
                                        <a href="https://knewby.io" target="_blank">
                                            <i className="fa-solid fa-globe mr-1.5"></i>
                                            <span>knewby.io</span>
                                        </a>
                                    </li>
                                    <li className="text-end mr-4">
                                        <i className="fa-solid fa-paper-plane mr-1.5"></i>
                                        <span>kolin@knewby.io</span>
                                    </li>
                                    <li className="">
                                        <a href="https://www.linkedin.com/in/knewby/" target="_blank">
                                            <i className="fa-brands fa-linkedin mr-1.5"></i>
                                            <span>linkedin.com/in/knewby</span>
                                        </a>
                                    </li>
                                    <li className="text-end mr-4">
                                        <i className="fa-solid fa-phone mr-1.5"></i>
                                        <span>+1 720.545.8100</span>
                                    </li>
                                    <li className="">
                                        <a href="https://github.com/kolin-newby" target="_blank">
                                            <i className="fa-brands fa-github mr-1.5"></i>
                                            <span>github.com/kolin-newby</span>
                                        </a>
                                    </li>
                                </ul>
                                <!-- small width list -->
                                <ul
                                    className="grid min-[2300px]:hidden grid-cols-1 gap-2 w-max text-xl"
                                >
                                    <li className="flex items-center justify-center min-[1160px]:justify-start">
                                        <i className="hidden min-[1160px]:flex fa-solid fa-earth-americas mr-1.5"></i>
                                        <span>Boulder, Colorado</span>
                                    </li>
                                    <li className="flex items-center justify-center min-[1160px]:justify-start">
                                        <i className="hidden min-[1160px]:flex fa-solid fa-paper-plane mr-1.5"></i>
                                        <span>kolin@knewby.io</span>
                                    </li>
                                    <li className="flex items-center justify-center min-[1160px]:justify-start">
                                        <i className="hidden min-[1160px]:flex fa-solid fa-phone mr-1.5"></i>
                                        <span>+1 720.545.8100</span>
                                    </li>
                                    <li>
                                        <a href="https://knewby.io" target="_blank"
                                           className="flex items-center justify-center min-[1160px]:justify-start">
                                            <i className="hidden min-[1160px]:flex fa-solid fa-globe mr-1.5"></i>
                                            <span>knewby.io</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/knewby/" target="_blank"
                                           className="flex items-center justify-center min-[1160px]:justify-start">
                                            <i className="hidden min-[1160px]:flex fa-brands fa-linkedin mr-1.5"></i>
                                            <span>linkedin.com/in/knewby</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/kolin-newby" target="_blank"
                                           className="flex items-center justify-center min-[1160px]:justify-start">
                                            <i className="hidden min-[1160px]:flex fa-brands fa-github mr-1.5"></i>
                                            <span>github.com/kolin-newby</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section id="education" className="flex flex-col">
                        <div className="flex flex-col justify-center items-center">
        <span className="flex font-bold text-2xl justify-center"
        >EDUCATION</span
        >
                            <hr className="h-0.5 w-5/6 bg-gray-300 rounded-sm my-4"/>
                            <div className="flex flex-col justify-center items-center">
        <span className="flex text-xl text-center"
        >University of Colorado Boulder</span
        >
                                <span className="flex mb-2 text-gray-600 text-center">2017 - 2021</span>
                            </div>
                            <hr className="h-0.5 w-3/6 bg-gray-300 rounded-sm my-2"/>
                            <div className="flex flex-col items-center">
                                <span className="text-lg text-center"> B.S. in Computer Science </span>
                                <span className="text-lg text-center"> Minor in Business </span>
                            </div>
                        </div>
                    </section>
                    <section id="skills" className="flex flex-col">
                        <div className="flex flex-col justify-center items-center">
        <span className="flex font-bold text-2xl justify-center text-center"
        >TECHNICAL SKILLS</span
        >
                            <hr className="h-0.5 w-5/6 bg-gray-300 rounded-sm mt-4"/>
                            <ul
                                className="grid grid-cols-1 min-[1700px]:grid-cols-2 text-xl space-y-2.5 min-[1200px]:list-disc min-[1700px]:list-none"
                            >
                                <li className="min-[1700px]:text-center mt-2.5">JavaScript/TypeScript</li>
                                <li className="min-[1700px]:text-center">React</li>
                                <li className="min-[1700px]:text-center">Node.JS</li>
                                <li className="min-[1700px]:text-center">HTML/CSS</li>
                                <li className="min-[1700px]:text-center">Tailwind CSS</li>
                                <li className="min-[1700px]:text-center">GraphQL</li>
                                <li className="min-[1700px]:text-center">REST APIs</li>
                                <li className="min-[1700px]:text-center">Agile Development</li>
                                <li className="min-[1700px]:text-center">Docker</li>
                                <li className="min-[1700px]:text-center">Git</li>
                                <li className="min-[1700px]:text-center">Golang</li>
                                <li className="min-[1700px]:text-center">OOP</li>
                                <li className="min-[1700px]:text-center">AWS</li>
                                <li className="min-[1700px]:text-center">Python</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}