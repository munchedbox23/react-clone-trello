import { FC } from "react";
import headerStyles from "./AppHeader.module.css";
import Logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const AppHeader: FC = () => {
  return (
    <header className={`${headerStyles.header} p-6`}>
      <img src={Logo} alt="Trello Logo" />
      <form>
        <div className={headerStyles.formWrapper}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={headerStyles.formIcon}
          />
          <input
            className={headerStyles.input}
            type="text"
            placeholder="Search board"
            maxLength={500}
          />
        </div>
      </form>
      <NavLink
        to="/profile"
        className={`${headerStyles.navLink} pt-2 pr-4 pb-2 pl-4`}
      >
        {({ isActive }) => (
          <>
            <FontAwesomeIcon
              className={isActive ? headerStyles.active : headerStyles.inactive}
              icon={faUser}
            />
            <span className={headerStyles.linkText}>Account</span>
          </>
        )}
      </NavLink>
    </header>
  );
};
