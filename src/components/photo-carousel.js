import {useState} from "react";

export default function PhotoCarousel() {

    const photoFiles = [
        {
            src: "KBN02251.jpg",
            info: {
                name: "Clyfford Still Museum",
                location: "Denver USA",
                desc: "Beautiful architecture in Denver"
                }
        },
        {
            src: "KBN04765.jpg",
            info: {
                name: "Catalina Island",
                location: "California USA",
                desc: "Backpacking 2022"
            }
        },
        {
            src: "prof.jpg",
            info: {
                name: "Grays & Torreys Peak",
                location: "Georgetown USA",
                desc: "Two 14ers, one day"
            }
        }
    ]

    const [activePhoto, setActivePhoto] = useState("prof.jpg");

    function returnPhotoClass(photo, i) {
        let activeClass = "active";
        let leftClass = "left";
        let rightClass = "right";

        if (photo === activePhoto) return activeClass;

        let activeIndex = photoFiles.findIndex((file) => file === activePhoto)
        if (activeIndex === 2) {
            if (i === 0) return rightClass;
            if (i === 1) return leftClass;
        }
        if (activeIndex === 0) {
            if (i === 1) return rightClass;
            if (i === 2) return leftClass;
        }
        else {
            if (i === 2) return rightClass;
            if (i === 0) return leftClass;
        }
    }

    return(
        <div className={"flex w-full h-full carousel items-center justify-center"} style={{backgroundImage:activePhoto}}>
            {photoFiles.map((photo, index) => (
                <div className={`${returnPhotoClass(photo.src, index)} h-[18rem] w-[12rem] largest:h-[40rem] largest:w-[28rem] pt-6 group object-cover relative`}>
                    <div
                        className={"absolute flex flex-col top-5 left-10"}
                    >
                        <span className={"flex text-3xl font-bold"}>{photo.info.name}</span>
                        <span className={"flex transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-2xl border-b border-bg-light w-max pb-2 mb-2"}>{"- " + photo.info.location}</span>
                        <span className={"flex transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-xl"}>{photo.info.desc}</span>
                    </div>
                    <img
                        key={"key-" + photo.src}
                        src={"/photos/" + photo.src}
                        alt={photo.src}
                        className={"w-full h-full object-cover rounded-xl"}
                    />
                </div>
            ))}
        </div>
    )
}
