import { FC } from "react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Preloader } from "../components/Preloader/Preloader";
import { Panel } from "../components/Panel/Panel";
import styles from "./MainLayout.module.css";

export const MainLayout: FC = () => {
  return (
    <>
      <AppHeader />
      <div className={styles.contentWrapper}>
        <Panel />
        <Outlet />
      </div>
    </>
  );
};
