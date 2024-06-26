import { FC } from "react";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Preloader } from "../../ui/Preloader/Preloader";
import { Panel } from "../../components/Panel/Panel";
import styles from "./MainLayout.module.css";
import { useAppSelector } from "../../services/store/hooks";

export const MainLayout: FC = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return isRequestLoading ? (
    <Preloader />
  ) : (
    <>
      <AppHeader />

      <main className={styles.contentWrapper}>
        <Panel />
        <Outlet />
      </main>
    </>
  );
};
