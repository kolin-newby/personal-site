import {Switch} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function ThemeSlider({darkMode, setDarkMode}) {
    return (
        <div className={"flex"}>
            <Switch
                checked={darkMode}
                onChange={setDarkMode}
            >
                <div className={"z-10 transition-colors rounded-full relative h-8 w-16 bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>
                        <span
                            className={`${
                                darkMode ? "translate-x-8" : ""
                            } z-20 transition-transform duration-400 absolute inset-y-1 left-1 h-6 w-6 transform rounded-full bg-bg-light dark:bg-bg-dark shadow-sm`}
                        />
                    <FontAwesomeIcon className={`${darkMode ? "text-bg-dark left-2.5" : "text-bg-light right-2.5"} absolute inset-y-1 h-6 w-6 drop-shadow`} icon={darkMode ? "moon" : "sun"}/>
                </div>
            </Switch>
        </div>
    )
}
