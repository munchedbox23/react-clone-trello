import styles from "./Panel.module.css";
import { PanelLink } from "./PanelLink/PanelLink";
import { ROUTE, panelLinks } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../services/feature/user/auth";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { FC } from "react";

export const Panel: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.user.user);

  const userName = user!.name
    .split(" ")
    .reduce((acc, word) => (acc += word.at(0)!.toUpperCase()), "");

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => navigate(ROUTE.authLayout.login, { replace: true }))
      .catch((error) => console.error(error));
  };

  return (
    <nav className={`${styles.navMenu} pt-6 pl-3 pr-3`}>
      <Link
        to={`/${ROUTE.mainLayout.profile}`}
        className={`${styles.profileLink} pt-2 pr-4 pb-2 pl-4`}
      >
        <span className={`${styles.profileText} text-center`}>{userName}</span>
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
      <div
        onClick={handleLogout}
        className={`${styles.logOut} pt-2 pr-4 pb-2 pl-4`}
      >
        <span className="text-lg font-medium">Logout</span>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </div>
    </nav>
  );
};
