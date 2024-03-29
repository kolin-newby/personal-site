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
                name: "Kolin Newby"
            }
        },
        {
            src: "KBN05347-Edit.jpg",
            info: {
                name: "Garden of the Gods",
                location: "Colorado Springs USA",
                desc: "Infrared Photography"
            }
        }
    ]

    const [activePhoto, setActivePhoto] = useState("prof.jpg");

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
                <div key={"carousel-photo-" + photo.info.name} className={`${returnPhotoClass(photo.src)} 
                absolute top-1/2 left-1/2 h-[20rem] w-[14rem] xs:h-[20rem] xs:w-[18rem] 
                lg:h-[22rem] lg:w-[22rem] 2xl:h-[40rem] 2xl:w-[30rem] group object-cover transition-all ${
                    returnPhotoClass(photo.src) === "active" ?
                    "shadow-lg dark:shadow-blue-900 hover:shadow-2xl"
                    :
                    ""}`}>
                    <div
                        className={`2xl:flex hidden absolute justify-center items-end flex-col top-12 right-0 bg-bg-light dark:bg-bg-dark bg-opacity-70 dark:bg-opacity-70 rounded-l pl-3 py-2 pr-4 ${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"}`}
                    >
                        {photo.info.name && photo.info.name !== "" && (<span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex 2xl:text-3xl font-bold`}
                        >
                            {photo.info.name}
                        </span>)}
                        {photo.info.location && photo.info.location !== "" && (<span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex 2xl:text-2xl border-b border-black dark:border-white w-max pb-2 mb-2`}
                        >
                            {photo.info.location}
                        </span>)}
                        {photo.info.desc && photo.info.desc !== "" && (<span
                            className={`${returnPhotoClass(photo.src) === "active" ? "visible" : "invisible"} flex 2xl:text-xl`}
                        >
                            {photo.info.desc}
                        </span>)}
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
