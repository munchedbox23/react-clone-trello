import { FC } from "react";
import styles from "./AuthButton.module.css";

type TAuthButtonProps = {
  text: string;
};

export const AuthButton: FC<TAuthButtonProps> = ({ text }) => {
  return (
    <button className={styles.authBtn} type="submit">
      {text}
    </button>
  );
};
