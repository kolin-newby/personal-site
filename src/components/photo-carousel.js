import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function PhotoCarousel({open, setOpen}) {

    const [spiderTime, setSpiderTime] = useState(false);
    const spiderImageUrl = "https://s2.darkroom.com/v1p83dyn7v6q5cqflum1c5wbb649";

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setSpiderTime(false);
        }, 2000);
        return () => clearTimeout(timeoutID);
    }, [spiderTime])

    return (
        <div className={`fixed flex inset-0 z-20 bg-black transform transition-transform duration-500 ${open ? "" : "translate-x-full"}`}>
            <div className={"flex items-center justify-center relative w-full"}>
                <div
                    className={"group absolute transition-colors duration-300 top-10 left-10 hover:bg-white/10 rounded-lg px-4 py-2 cursor-pointer"}
                    onClick={() => setOpen(false)}
                >
                    <FontAwesomeIcon icon={"times"}
                                     className={"text-white/30 group-hover:text-white/60 transition-colors duration-300 text-4xl"}/>
                </div>
                <div className={"group absolute flex flex-col top-0 right-10 w-36"} onClick={() => setSpiderTime(!spiderTime)}>
                    <div className={"flex flex-col items-center justify-center relative transform group-hover:translate-y-0 -translate-y-20 duration-1000 transition-transform"}>
                        <div className={"bg-white/10 w-0.5 h-20"}/>
                        <FontAwesomeIcon icon={"spider"} className={"flex text-white/50 text-lg transform rotate-180 -translate-y-1"}/>
                    </div>
                </div>
                <div className={`absolute flex flex-col transform transition-transform duration-500 right-5 top-44 ${spiderTime ? "translate-x-0" : "translate-x-40"}`}>
                    <img src={spiderImageUrl} alt={"friendly cat-faced spider"} className={"flex rounded-full object-right-top object-none self-end blur-sm w-10 mb-10"}/>
                    <img src={spiderImageUrl} alt={"friendly cat-faced spider"} className={"flex rounded-xl object-center object-fill w-32"}/>
                    <div className={"flex justify-between"}>
                        <img src={spiderImageUrl} alt={"friendly cat-faced spider"} className={"flex rounded-full object-left-bottom object-none blur-sm w-8 mt-10"}/>
                        <span className={"flex rounded-full bg-white/40 px-4 text-sm items-center mt-2 h-8"}>hi!</span>
                    </div>
                </div>
                <div id={"shift-container"} className={"absolute inset-0 bg-black/10 -z-10"}/>
                <div className={"flex w-4/5 h-3/4 items-center justify-center"}>
                    <div className={"flex flex-col mr-2 hover:mr-10 bg-center bg-cover bg-no-repeat bg-photo-1 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                    <div className={"flex flex-col mr-2 hover:mx-10 bg-center bg-cover bg-no-repeat bg-photo-2 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                    <div className={"flex flex-col mr-2 hover:mx-10 bg-center bg-cover bg-no-repeat bg-photo-3 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                    <div className={"flex flex-col mr-2 hover:mx-10 bg-center bg-cover bg-no-repeat bg-photo-4 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                    <div className={"flex flex-col mr-2 hover:mx-10 bg-center bg-cover bg-no-repeat bg-photo-5 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                    <div className={"flex flex-col hover:ml-10 bg-center bg-cover bg-no-repeat bg-photo-6 h-full transition-all duration-1000 basis-24 hover:basis-4/6 rounded-xl transform skew-x-6 hover:skew-x-0"}/>
                </div>
            </div>
        </div>
    )
}
