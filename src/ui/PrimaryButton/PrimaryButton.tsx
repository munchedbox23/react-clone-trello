import { FC, memo } from "react";
import styles from "./PrimaryButton.module.css";

type TPrimaryButtonProps = {
  label: string;
  isDisabled: boolean;
  type: "button" | "submit" | "reset";
};

export const PrimaryButton: FC<TPrimaryButtonProps> = memo(
  ({ isDisabled, label, type = "button" }) => {
    return (
      <button
        disabled={isDisabled}
        className={`${styles.authBtn} ${isDisabled && styles.disabled}`}
        type={type}
      >
        {label}
      </button>
    );
  }
);
