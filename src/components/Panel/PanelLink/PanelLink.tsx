import styles from "./PanelLink.module.css";
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
        `${styles.panelLink} ${isActive && styles.primary} pr-4 pl-4`
      }
      to={route}
    >
      <FontAwesomeIcon
        className={`${styles.link} pt-1 pr-4 pb-1 pl-4`}
        icon={icon}
      />
      <span>{text}</span>
    </NavLink>
  );
};
