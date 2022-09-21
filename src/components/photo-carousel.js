import {useState} from "react";

export default function PhotoCarousel() {

    const photoFiles = [
        {
            src: "KBN02251.jpg",
            info: {
                name: "Clyfford Still Museum",
                location: "Denver USA",
                desc: "Architecture in Denver"
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

    const [activePhoto, setActivePhoto] = useState("KBN02251.jpg");

    function returnPhotoClass(photo) {
        if (photo === activePhoto) return "active";
        else return "inactive";
    }

    function handlePhotoClick(photo) {
        if (photo.src === activePhoto) return;

        setActivePhoto(photo.src);
    }

    return(
        <div className={"relative w-full block carousel"}>
            {photoFiles.sort((a, b) => {
                if (a.src === activePhoto && b.src !== activePhoto) return 1;
                if (b.src === activePhoto && a.src !== activePhoto) return -1;
                return 0;
            }).map((photo) => (
                <div className={`${returnPhotoClass(photo.src)} absolute transition-all top-1/2 left-1/2 h-[20rem] w-[14rem] xs:h-[20rem] xs:w-[18rem] lg:h-[22rem] lg:w-[22rem] 2xl:h-[40rem] 2xl:w-[30rem] group object-cover ${
                    returnPhotoClass(photo.src) === "active" ?
                    "shadow-lg dark:shadow-blue-900 hover:shadow-2xl"
                    :
                    ""}`}>
                    <div
                        className={`small:flex hidden absolute justify-center items-end flex-col top-16 right-0 bg-bg-light dark:bg-bg-dark bg-opacity-70 dark:bg-opacity-70 rounded-l pl-3 py-2 pr-4 ${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"}`}
                    >
                        <span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex 2xl:text-3xl font-bold`}
                        >
                            {photo.info.name}
                        </span>
                        <span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex transition-opacity duration-300 2xl:text-2xl border-b border-black dark:border-white w-max pb-2 mb-2`}
                        >
                            {photo.info.location}
                        </span>
                        <span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex transition-opacity duration-300 2xl:text-xl`}
                        >
                            {photo.info.desc}
                        </span>
                    </div>
                    <img
                        key={"key-" + photo.src}
                        src={"/photos/" + photo.src}
                        alt={photo.src}
                        onClick={() => handlePhotoClick(photo)}
                        className={`w-full h-full object-cover rounded-xl ${returnPhotoClass(photo.src) === "active" ?
                            "opacity-100"
                            :
                            "opacity-40 hover:opacity-60 transition-opacity"}
                            `}
                    />
                </div>
            ))}
        </div>
    )
}
