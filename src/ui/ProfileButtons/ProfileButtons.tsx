import { FC } from "react";
import buttonStyle from "./ProfileButtons.module.css";
import { AnimatePresence, motion } from "framer-motion";

type TProfileButtons = {
  onCancel: () => void;
  isVisible: boolean;
};

export const ProfileButtons: FC<TProfileButtons> = ({
  isVisible,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={buttonStyle.buttons}
          initial={{ x: "150px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className={buttonStyle.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={buttonStyle.saveBtn} type="submit">
            Save
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
