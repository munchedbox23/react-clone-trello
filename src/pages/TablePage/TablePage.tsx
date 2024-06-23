import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import styles from "./TablePage.module.css";
import { useParams } from "react-router";
import { TableHeader } from "../../components/TableHeader/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useState } from "react";
import { IColumn } from "../../types/boardsTypes";
import { updateColumns } from "../../services/feature/boards/boardsSlice";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";

export const TablePage: FC = () => {
  const { tableId } = useParams();
  const currentBoard = useAppSelector((store) => store.boards.boards).find(
    (board) => board.id === tableId
  );
  const [boardColumns, setBoardsColumns] = useState<IColumn[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentBoard) {
      setBoardsColumns(currentBoard.columns);
    }
  }, [currentBoard]);

  const handleUpdateColumns = () => {
    if (currentBoard) {
      const updatedColumns = [
        ...boardColumns,
        { id: uuidv4(), title: "new column", tasks: [] },
      ];
      dispatch(
        updateColumns({ boardId: currentBoard.id, columns: updatedColumns })
      );
    }
  };
  return (
    <>
      <div
        style={{ backgroundImage: `url(${currentBoard?.background.regular})` }}
        className={styles.board}
      >
        <TableHeader />
        <div className={cn(styles.columnsContainer, "pt-5 px-6")}>
          <div>
            {currentBoard?.columns.map((item) => (
              <div key={item.id}>{item.title}</div>
            ))}
          </div>
          <button
            className={styles.addColumnBtn}
            type="button"
            data-testid="list-composer-button"
            onClick={handleUpdateColumns}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="text-base font-semibold">Add another column</span>
          </button>
        </div>
      </div>
    </>
  );
};
