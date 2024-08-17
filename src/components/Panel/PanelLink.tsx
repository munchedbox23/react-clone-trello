import { NavLink } from "react-router-dom";
import { FC } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TPanelLinkProps = {
  route: string;
  icon: IconDefinition;
  text: string;
};

export const PanelLink: FC<TPanelLinkProps> = ({ route, icon, text }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `w-full bg-transparent rounded-lg flex items-center min-h-5 text-sm font-medium text-blue-950 transition-colors transition-shadow duration-75 ease-in hover:bg-black-primary ${isActive && "bg-indigo-100 text-blue-600"} pr-4 pl-4`
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
