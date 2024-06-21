import { FC, useState } from "react";
import styles from "./BoardCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { IBoard } from "../../types/boardsTypes";
import { useAppDispatch } from "../../services/store/hooks";
import { deleteBoard } from "../../services/feature/boards/boardsSlice";

type TBoardCardProps = {
  hasOptions?: boolean;
  data: IBoard;
};

export const BoardCard: FC<TBoardCardProps> = ({ hasOptions, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenMenu = (): void => {
    setIsVisible(!isVisible);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBoard(id));
  };

  return (
    <div
      style={{ backgroundImage: `url(${data.background}` }}
      className={`${styles.boardBtn} p-4`}
    >
      {hasOptions && (
        <FontAwesomeIcon
          icon={faEllipsis}
          className={`${styles.cardIcon} ${isVisible && styles.active}`}
          onClick={handleOpenMenu}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`${styles.cardMenu} p-4`}
            initial={{ opacity: 0, clipPath: "circle(0.4% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(141.2% at 100% 0)" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, clipPath: "circle(0.4% at 100% 0)" }}
          >
            <button
              onClick={() => handleDelete(data.id)}
              className={styles.menuBtn}
            >
              <span>Delete</span>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ff0000" }} />
            </button>
            <button className={styles.menuBtn}>
              <span>Edit</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#477eff" }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <h4 className="font-medium text-lg mb-3">{data.name}</h4>
    </div>
  );
};
