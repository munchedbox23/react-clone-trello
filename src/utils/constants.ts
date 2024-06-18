import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faPeopleRoof,
  faGear,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export const ROUTE = Object.freeze({
  home: "/",
  mainLayout: {
    profile: "profile-settings",
    boards: "boards",
    members: "members",
    info: "info",
  },
  authLayout: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  table: "boards/:tableId",
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
    name: "Boards",
    route: `${ROUTE.home}`,
    icon: faChartSimple,
  },
  {
    id: 2,
    name: "Members",
    route: `/${ROUTE.mainLayout.members}`,
    icon: faPeopleRoof,
  },
  {
    id: 3,
    name: "Settings",
    route: `/${ROUTE.mainLayout.profile}`,
    icon: faGear,
  },
  {
    id: 4,
    name: "Information",
    route: `/${ROUTE.mainLayout.info}`,
    icon: faCircleInfo,
  },
];
