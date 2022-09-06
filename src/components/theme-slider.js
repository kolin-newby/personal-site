import {Switch} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function ThemeSlider({darkMode, setDarkMode}) {
    return (
        <div className={"flex drop-shadow-lg"}>
            <Switch
                checked={darkMode}
                onChange={setDarkMode}
            >
                <div className={"z-10 transition-colors rounded-full relative h-7 w-16 bg-gradient-to-r from-theme-light-1 to-theme-light-2 dark:from-theme-dark-1 dark:to-theme-dark-2"}>
                        <span
                            className={`${
                                darkMode ? "translate-x-9" : ""
                            } z-20 transition-transform duration-400 absolute inset-y-1 left-1 h-5 w-5 transform rounded-full bg-bg-dark dark:bg-bg-light shadow-sm`}
                        />
                    <FontAwesomeIcon className={`${darkMode ? "text-bg-light left-1.5" : "text-bg-dark right-1.5"} absolute inset-y-1.5 h-4.5 w-4.5 drop-shadow`} icon={darkMode ? "moon" : "sun"}/>
                </div>
            </Switch>
        </div>
    )
}
