import PhotoCarousel from "./photo-carousel";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function About() {

    const [photosOpen, setPhotosOpen] = useState(false);

    return(
        <div id={"about"} className={"relative flex flex-col h-[calc(100vh-5rem)] items-center"}>
            <div className={"flex flex-col h-full items-center justify-center"}>
                <div className={"flex justify-start px-12 pt-10"}>
                    <span className={"flex w-1/2"}>I have a passion for hiking, backpacking, and photography. Please feel free to check out some of my favorite shots to the right!
                                I love the outdoors and I aspire to be able to use my skills as a developer to make exploring our world easier!</span><br/>
                </div>
                <div className={"flex  justify-center items-center my-10 w-1/4 relative rounded-full group"}>
                    <img
                        className={"flex object-contain rounded-full w-full"}
                        src={"photos/me.jpg"}
                        alt={"Kolin"}
                    />
                    <div
                        className={"absolute blur object-contain rounded-full -inset-3 -z-10 animate-spin opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-white/80 to-white/10 transition-opacity duration-700"}
                    />
                </div>
                <div className={"flex justify-end px-12 pb-10"}>
                   <span className={"flex w-1/2"}>I have my BS in Computer Science from CU Boulder and I went from there to building an open source API logger written in Go,
                                check out my Github if that project piques your interest! Since then I've moved into other areas of development.
                                At Graylog, I lead development of a robust, data-driven web UI built with React.js and Node and I look forward to
                                continuing to grow my skills and knowledge into other areas!
                    </span>
                </div>
            </div>
            <div
                className={"absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-xl w-8 bg-black/60 h-1/3" +
                    " flex items-center justify-center"}
                onClick={() => setPhotosOpen(!photosOpen)}
            >
                <FontAwesomeIcon icon={"images"} className={"flex"}/>
            </div>
            <PhotoCarousel open={photosOpen} setOpen={setPhotosOpen}/>
        </div>
    )
}
