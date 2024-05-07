import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faPeopleRoof,
  faGear,
  faCircleInfo,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export const panelLinks: {
  id: number;
  name: string;
  route: string;
  icon: IconDefinition;
}[] = [
  {
    id: 1,
    name: "Home",
    route: "/",
    icon: faHouse,
  },
  {
    id: 2,
    name: "Boards",
    route: "/boards",
    icon: faChartSimple,
  },
  {
    id: 3,
    name: "Members",
    route: "/members",
    icon: faPeopleRoof,
  },
  {
    id: 4,
    name: "Settings",
    route: "/settings",
    icon: faGear,
  },
  {
    id: 5,
    name: "Information",
    route: "/info",
    icon: faCircleInfo,
  },
];
