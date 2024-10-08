import { NavLink } from "react-router-dom";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TPanelLinkProps } from "../../model/types/panel-types";

export const PanelLink: FC<TPanelLinkProps> = ({ route, icon, text }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `w-full rounded-lg flex items-center min-h-5 text-sm font-medium transition-colors transition-shadow duration-75 ease-in hover:bg-black-primary px-4 ${isActive ? "text-blue-600 bg-indigo-100" : "text-blue-950 bg-transparent"} `
      }
      to={route}
    >
      <FontAwesomeIcon
        className={`block grow-0 shrink-0 text-2xl w-6 h-6 text-sky-900 pt-1 pr-4 pb-1 pl-4`}
        icon={icon}
      />
      <span>{text}</span>
    </NavLink>
  );
};
