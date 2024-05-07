import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faPeopleRoof,
  faGear,
  faCircleInfo,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

export const ROUTE = Object.freeze({
  home: "/",
  mainLayout: {
    profile: "profile",
    boards: "boards",
    members: "members",
    settigns: "settings",
    info: "info",
  },
  authLayout: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
});

export const API = Object.freeze({
  baseUrl: "https://norma.nomoreparties.space/api",
  endpoints: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    forgotPassword: "/password-reset",
    resetPassword: "/password-reset/reset",
    userData: "/auth/user",
    refreshToken: "/auth/token",
  },
});

export const panelLinks: {
  id: number;
  name: string;
  route: string;
  icon: IconDefinition;
}[] = [
  {
    id: 1,
    name: "Home",
    route: ROUTE.home,
    icon: faHouse,
  },
  {
    id: 2,
    name: "Boards",
    route: `/${ROUTE.mainLayout.boards}`,
    icon: faChartSimple,
  },
  {
    id: 3,
    name: "Members",
    route: `/${ROUTE.mainLayout.members}`,
    icon: faPeopleRoof,
  },
  {
    id: 4,
    name: "Settings",
    route: `/${ROUTE.mainLayout.settigns}`,
    icon: faGear,
  },
  {
    id: 5,
    name: "Information",
    route: `/${ROUTE.mainLayout.info}`,
    icon: faCircleInfo,
  },
];
