import styles from "./Panel.module.css";
import { PanelLink } from "./PanelLink/PanelLink";
import { ROUTE, panelLinks } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../services/feature/user/auth";
import { useAppDispatch, useAppSelector } from "../../app/appStore";
import { FC } from "react";
import { Avatar } from "../../ui/Avatar/Avatar";

export const Panel: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.user.user);

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => navigate(ROUTE.authLayout.login, { replace: true }))
      .catch((error) => console.error(error));
  };

  return (
    <nav className={`${styles.navMenu} pt-6 pl-3 pr-3 flex-0 w-2/12`}>
      <Avatar>
        <h4 className="text-lg font-medium mt-3">{user?.name}</h4>
        <small className="text-sm">{user?.email}</small>
      </Avatar>
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
