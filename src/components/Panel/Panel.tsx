import styles from "./Panel.module.css";
import { PanelLink } from "../PanelLink/PanelLink";
import { panelLinks } from "../../utils/constants";

export const Panel = () => {
  return (
    <nav className={`${styles.navMenu} pt-6 pl-3 pr-3`}>
      <ul className={styles.links}>
        {panelLinks.map((link) => (
          <PanelLink
            key={link.id}
            route={link.route}
            text={link.name}
            icon={link.icon}
          />
        ))}
      </ul>
    </nav>
  );
};
