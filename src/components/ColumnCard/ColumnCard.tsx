import { FC } from "react";
import styles from "./ColumnCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/appStore";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { setSelectedTask } from "../../services/feature/boards/boardsSlice";
import { ITask } from "../../types/boardsTypes";

type TColumnCard = {
  task: ITask;
  boardId: string;
  columnId: string;
};

export const ColumnCard: FC<TColumnCard> = ({ task, boardId, columnId }) => {
  const dispatch = useAppDispatch();

  return (
    <li
      data-testid="list-card"
      className={styles.columnCard}
      onClick={() => {
        dispatch(setSelectedTask({ task, boardId, columnId }));
        dispatch(setModalOpen());
      }}
    >
      <div
        role="button"
        data-testid="trello-card"
        className={styles.trelloCard}
      >
        <p className="text-base font-normal">{task.title}</p>
        <FontAwesomeIcon
          className={`${styles.editIcon} ${styles.hidden}`}
          icon={faHighlighter}
        />
      </div>
    </li>
  );
};
