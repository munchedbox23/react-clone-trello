import styles from "./BoardCard.module.css";
import { FC, PropsWithChildren } from "react";

export const BoardCard: FC<PropsWithChildren> = ({ children }) => {
  return <div className={`${styles.boardBtn} p-4`}>{children}</div>;
};
