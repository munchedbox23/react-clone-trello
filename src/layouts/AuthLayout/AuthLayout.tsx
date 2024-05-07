import Logo from "../../images/logo.png";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";
import { Preloader } from "../../components/Preloader/Preloader";

export const AuthLayout = () => {
  return (
    <section className={`${styles.loginPage} pt-20`}>
      <img src={Logo} alt="Logo trello" />
      <Outlet />
    </section>
  );
};
