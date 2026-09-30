import type { ReactElement } from "react";
import { BriefcaseBusiness, House, User } from "lucide-react";

type NavbarItem = {
  id: string;
  title: string;
  icon: ReactElement;
};

// Each id is also the id of the page section it scrolls to.
export const navbarItems: NavbarItem[] = [
  { id: "home", title: "Home", icon: <House /> },
  { id: "about", title: "About", icon: <User /> },
  { id: "projects", title: "Projects", icon: <BriefcaseBusiness /> }
];
