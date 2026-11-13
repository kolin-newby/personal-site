import type { ReactElement } from "react";
import { BriefcaseBusiness, House, Newspaper } from "lucide-react";

type NavbarItem = {
  id: string;
  path: string;
  title: string;
  icon: ReactElement;
};

// Each id is also the id of the page section it scrolls to.
export const navbarItems: NavbarItem[] = [
  { id: "home", path: "/", title: "Home", icon: <House /> },
  {
    id: "portfolio",
    path: "/portfolio",
    title: "Portfolio",
    icon: <BriefcaseBusiness />
  },
  { id: "content", path: "/content", title: "Content", icon: <Newspaper /> }
];
