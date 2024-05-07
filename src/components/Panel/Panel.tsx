import styles from "./Panel.module.css";
import { PanelLink } from "./PanelLink/PanelLink";
import { panelLinks } from "../../utils/constants";
import { Link } from "react-router-dom";

export const Panel = () => {
  return (
    <nav className={`${styles.navMenu} pt-6 pl-3 pr-3`}>
      <Link
        to="/profile"
        className={`${styles.profileLink} pt-2 pr-4 pb-2 pl-4`}
      >
        <span className={styles.profileText}>ER</span>
      </Link>
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
