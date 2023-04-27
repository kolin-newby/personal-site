import { library } from "@fortawesome/fontawesome-svg-core";

// Standard icon imports
import {
    faTimes,
    faCaretLeft,
    faCaretRight,
    faCircle,
    faStore,
    faMoon,
    faSun,
    faDownload,
    faTimesCircle,
    faBars,
    faFileLines,
    faTerminal,
    faCircleExclamation,
    faEarthAmericas,
    faPhone,
    faGlobe,
    faPaperPlane,
    faPlay,
    faSquareCheck
} from "@fortawesome/free-solid-svg-icons";

// Branded icon imports
import { faInstagram, faFacebook, faTwitter, faSnapchatGhost, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export const loadIcons = () => {
    library.add(
        faInstagram,
        faLinkedin,
        faGithub,
        faTwitter,
        faFacebook,
        faSnapchatGhost,
        faTimes,
        faCaretLeft,
        faCaretRight,
        faCircle,
        faStore,
        faMoon,
        faSun,
        faDownload,
        faTimesCircle,
        faBars,
        faFileLines,
        faTerminal,
        faCircleExclamation,
        faEarthAmericas,
        faPhone,
        faGlobe,
        faPaperPlane,
        faPlay,
        faSquareCheck
    );
};
