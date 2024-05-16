import styles from "./BoardCard.module.css";
import { FC, forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { IBoard, IBoardTemplates } from "../../types/boardTypes";
import { AnimatePresence, motion } from "framer-motion";

type TBoardCardProps = {
  data: IBoard | IBoardTemplates;
  hasOptions: boolean;
  onDelete: (id: string, type: string) => void;
};

export const BoardCard = forwardRef<HTMLDivElement, TBoardCardProps>(
  ({ data, hasOptions, onDelete }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleOpenMenu = (): void => {
      setIsVisible(!isVisible);
    };

    return (
      <div
        style={{ backgroundImage: `url(${data.background})` }}
        className={`${styles.boardBtn} p-4`}
        ref={ref}
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
                onClick={() => onDelete(data.id, data.type)}
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
        {data.purpose && (
          <span
            className={`${styles.cardInfo} font-normal text-base pt-2 pb-3 pl-2`}
          >
            {data.purpose}
          </span>
        )}
      </div>
    );
  }
);

export const MBoardCard = motion(BoardCard);
