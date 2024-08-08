import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Button, MStack } from "munchedbox-ui";

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
        <MStack
          initial={{ x: "150px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          direction="row"
          align="center"
          spacing="sm"
        >
          <Button
            onClick={onCancel}
            style={{ backgroundColor: "red" }}
            size="sm"
            type="button"
            variant="primary"
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" variant="primary">
            Save
          </Button>
        </MStack>
      ) : null}
    </AnimatePresence>
  );
};
