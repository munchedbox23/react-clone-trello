import { FC } from "react";
import styles from "./Preloader.module.css";

export const Preloader: FC = () => {
  return <span className={styles.loader}></span>;
};
