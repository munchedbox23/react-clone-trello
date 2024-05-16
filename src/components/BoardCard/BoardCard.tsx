import styles from "./BoardCard.module.css";
import { useRef, useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { IBoard, IBoardTemplates } from "../../types/boardTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useDrop, useDrag } from "react-dnd";
import { Identifier } from "dnd-core";
import { DragTypes } from "../../utils/dragTypes";
import { moveCard } from "../../services/feature/board/boardSlice";
import { useAppDispatch } from "../../services/store/hooks";

type TBoardCardProps = {
  data: IBoard | IBoardTemplates;
  hasOptions: boolean;
  onDelete: (id: string, type: string) => void;
  index: number;
};

export const BoardCard: FC<TBoardCardProps> = ({
  data,
  hasOptions,
  onDelete,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const myRef = useRef<HTMLDivElement | null>(null);
  const { id } = data;
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop<
    { index: number },
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragTypes.CARD,
    collect: (monitor) => ({
      handlerId: monitor?.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!myRef.current || data.type !== "column") {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = myRef.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      dispatch(moveCard({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: DragTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(myRef));

  const handleOpenMenu = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={{ backgroundImage: `url(${data.background})`, opacity }}
      className={`${styles.boardBtn} p-4`}
      data-handler-id={handlerId}
      ref={myRef}
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
};
