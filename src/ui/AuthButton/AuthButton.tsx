import { FC, memo } from "react";
import styles from "./AuthButton.module.css";

type TAuthButtonProps = {
  text: string;
  isDisabled: boolean;
};

export const AuthButton: FC<TAuthButtonProps> = memo(({ isDisabled, text }) => {
  return (
    <button
      disabled={isDisabled}
      className={`${styles.authBtn} ${isDisabled && styles.disabled}`}
      type="submit"
    >
      {text}
    </button>
  );
});
