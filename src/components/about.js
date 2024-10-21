import PhotoCarousel from "./photo-carousel";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function About() {

    const [photosOpen, setPhotosOpen] = useState(false);

    return(
        <div id={"about"} className={"relative flex h-[calc(100vh-5rem)] mt-20 items-center"}>
            <div className={"flex flex-row items-center h-full w-full"}>
                <div className={"flex justify-center items-end h-full w-full pb-16"}>
                    <span className={"group flex relative w-3/4 bg-white/60 rounded-lg p-6"}>I have a passion for hiking, backpacking, and photography. Please feel free to check out some of my favorite shots by clicking on my photo in the center of the screen!
                                I love the outdoors and I aspire to be able to use my skills as a developer to make exploring our world easier!
                        <div className={"absolute w-full h-full inset-0 transition-transform transform translate-y-3 translate-x-3 group-hover:translate-y-3.5 group-hover:translate-x-3.5 rounded-lg border border-white/40 -z-10"}/>
                    </span>
                </div>
                <div className={"flex justify-center items-center w-4/5 bg-red-500 relative rounded-full group"}>
                    <img
                        className={"flex object-contain rounded-full inset-y-0 cursor-pointer"}
                        src={"photos/me.jpg"}
                        alt={"Kolin"}
                        onClick={() => {
                            setPhotosOpen(true);
                        }}
                    />
                    <div
                        className={"absolute blur object-contain rounded-full -inset-3 -z-10 animate-spin opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-white/80 to-white/10 transition-opacity duration-700"}
                    />
                </div>
                <div className={"flex justify-center items-start h-full pt-16 w-full"}>
                   <span className={"group flex relative w-3/4 bg-white/60 rounded-lg p-6"}>I have my BS in Computer Science from CU Boulder and I went from there to building an open source API logger written in Go,
                                check out my Github if that project piques your interest! Since then I've moved into other areas of development.
                                At Graylog, I lead development of a robust, data-driven web UI built with React.js and Node and I look forward to
                                continuing to grow my skills and knowledge into other areas!
                       <div
                           className={"absolute w-full h-full inset-0 transition-transform transform -translate-y-3 -translate-x-3 group-hover:-translate-y-3.5 group-hover:-translate-x-3.5 rounded-lg border border-white/40 -z-10"}/>
                    </span>
                </div>
            </div>
            <PhotoCarousel open={photosOpen} setOpen={setPhotosOpen}/>
        </div>
    )
}
