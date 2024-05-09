import { FC } from "react";
import buttonStyle from "./ProfileButtons.module.css";

type TProfileButtons = {
  onCancel: () => void;
  isVisible: boolean;
};

export const ProfileButtons: FC<TProfileButtons> = ({
  isVisible,
  onCancel,
}) => {
  return isVisible ? (
    <div className={buttonStyle.buttons}>
      <button className={buttonStyle.cancelBtn} onClick={onCancel}>
        Cancel
      </button>
      <button className={buttonStyle.saveBtn} type="submit">
        Save
      </button>
    </div>
  ) : null;
};
