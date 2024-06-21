import Logo from "../../assets/images/logo.png";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";
import { Preloader } from "../../ui/Preloader/Preloader";
import { useAppSelector } from "../../services/store/hooks";

export const AuthLayout = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return (
    <section className={`${styles.loginPage} pt-20`}>
      <img src={Logo} alt="Logo trello" />
      {isRequestLoading ? <Preloader /> : <Outlet />}
    </section>
  );
};
