import { FC } from "react";
import buttonStyle from "./ProfileButtons.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "munchedbox-ui";

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
          <Button
            onClick={onCancel}
            size="sm"
            type="button"
            variant="primary"
            className="bg-red-600 rounded-xl font-medium"
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" variant="primary">
            Save
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
