import {Switch} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function ThemeSlider({darkMode, setDarkMode}) {

    function handleThemeChange(mode) {
        document.cookie = "darkMode=" + mode;
        setDarkMode(mode);
    }

    return (
        <div className={"flex drop-shadow-lg"}>
            <Switch
                id={"darkModeSwitch"}
                checked={darkMode}
                onChange={(mode) => handleThemeChange(mode)}
            >
                <div className={"z-10 group transition-all rounded-lg relative h-7 w-16 bg-transparent hover:bg-white/20"}>
                        <span
                            className={`${
                                darkMode ? "translate-x-9" : ""
                            } z-20 transition-transform hover:scale-110 duration-400 absolute inset-y-1 left-1 h-5 w-5 transform rounded-lg bg-bg-dark dark:bg-bg-light shadow-sm`}
                        />
                    <FontAwesomeIcon className={`${darkMode ? "text-bg-light left-1.5" : "text-bg-dark right-1.5"} absolute inset-y-1.5 h-4.5 w-4.5 drop-shadow`} icon={darkMode ? "moon" : "sun"}/>
                </div>
            </Switch>
        </div>
    )
}
