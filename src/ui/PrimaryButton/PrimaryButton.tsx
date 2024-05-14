import { FC, memo } from "react";
import styles from "./PrimaryButton.module.css";

type TPrimaryButtonProps = {
  text: string;
  isDisabled: boolean;
};

export const PrimaryButton: FC<TPrimaryButtonProps> = memo(
  ({ isDisabled, text }) => {
    return (
      <button
        disabled={isDisabled}
        className={`${styles.authBtn} ${isDisabled && styles.disabled}`}
        type="submit"
      >
        {text}
      </button>
    );
  }
);
