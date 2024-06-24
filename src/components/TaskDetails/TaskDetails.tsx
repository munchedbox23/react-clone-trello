import { useAppSelector } from "../../services/store/hooks";
import styles from "./TaskDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { EditableTitle } from "../../ui/EditableTitle/EditableTitle";
import { FC } from "react";

type TTaskDetailsProps = {
  onUpdateTaskName: (
    boardId: string,
    columnId: string,
    taskId: string,
    newName: string
  ) => void;
};

export const TaskDetails: FC<TTaskDetailsProps> = ({ onUpdateTaskName }) => {
  const selectedTask = useAppSelector((store) => store.boards.selectedTask);

  if (!selectedTask) return null;

  const { task, boardId, columnId } = selectedTask;

  return (
    <div className={styles.cardBanner}>
      <header className={styles.cardDetailHeader}>
        <FontAwesomeIcon icon={faWindowMaximize} />
        <div className={cn(styles.windowTitle)}>
          <EditableTitle
            inputName="cardName"
            initialValue={task.title}
            updateName={(newName) =>
              onUpdateTaskName(boardId, columnId, task.id, newName)
            }
          />
        </div>
      </header>
      <div className={cn(styles.cardDescription, "mt-8")}>
        <div className={styles.descriptionTitle}>
          <FontAwesomeIcon icon={faBarsStaggered} />
          <h3 className="text-base font-bold">Description</h3>
        </div>
        <div className={styles.descriptionContent}></div>
      </div>
    </div>
  );
};
