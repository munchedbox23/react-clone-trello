import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import styles from "./TablePage.module.css";
import { useParams } from "react-router";
import { TableHeader } from "../../components/TableHeader/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { IColumn } from "../../types/boardsTypes";
import { updateColumns } from "../../services/feature/boards/boardsSlice";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { ColumnList } from "../../components/ColumnList/ColumnList";
import { MCardForm } from "../../ui/CardForm/CardForm";
import { useForm } from "../../hooks/useForm";

interface IState {
  isVisible: boolean;
  columnName: string;
  boardColumns: IColumn[];
}

export const TablePage: FC = () => {
  const { tableId } = useParams();
  const [state, setState] = useState<IState>({
    isVisible: false,
    columnName: "",
    boardColumns: [],
  });
  const currentBoard = useAppSelector((store) => store.boards.boards).find(
    (board) => board.id === tableId
  );
  const dispatch = useAppDispatch();
  const { formState, onChange, setFormState } = useForm<{ columnName: string }>(
    {
      columnName: "",
    }
  );

  useEffect(() => {
    if (currentBoard) {
      setState({
        ...state,
        boardColumns: currentBoard.columns,
      });
    }
  }, [currentBoard]);

  const addNewColumn = () => {
    if (currentBoard) {
      const newColumn = {
        id: uuidv4(),
        title: formState.columnName,
        tasks: [],
      };
      dispatch(
        updateColumns({
          boardId: currentBoard.id,
          columns: [...state.boardColumns, newColumn],
        })
      );
      setFormState({
        ...formState,
        columnName: "",
      });
      setState({
        ...state,
        isVisible: false,
      });
    }
  };

  const updateColumnName = (
    boardId: string,
    columnId: string,
    newName: string
  ) => {
    const updatedColumns = state.boardColumns.map((column) =>
      column.id === columnId ? { ...column, title: newName } : column
    );
    dispatch(updateColumns({ boardId, columns: updatedColumns }));
  };

  const deleteColumn = (boardId: string, columnId: string) => {
    const updatedColumns = state.boardColumns.filter(
      (column) => column.id !== columnId
    );
    dispatch(updateColumns({ boardId, columns: updatedColumns }));
  };

  const addNewCard = (boardId: string, columnId: string, cardName: string) => {
    const updatedColumns = state.boardColumns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: [
              ...column.tasks,
              { id: uuidv4(), title: cardName, description: "" },
            ],
          }
        : column
    );
    dispatch(updateColumns({ boardId, columns: updatedColumns }));
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${currentBoard?.background.regular})` }}
        className={styles.board}
      >
        <TableHeader />
        <div className={cn(styles.columnsContainer, "px-6 py-5")}>
          <ol className={styles.columnList}>
            {currentBoard?.columns.map((item) => (
              <ColumnList
                key={item.id}
                name={item.title}
                columnId={item.id}
                board={currentBoard}
                updateColumnName={updateColumnName}
                deleteColumn={deleteColumn}
                addCard={addNewCard}
                tasks={item.tasks}
              />
            ))}
          </ol>
          <AnimatePresence mode="wait">
            {state.isVisible ? (
              <MCardForm
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClose={() =>
                  setState({
                    ...state,
                    isVisible: false,
                  })
                }
                onClick={addNewColumn}
                value={formState.columnName}
                handleChangeValue={onChange}
                buttonText="Add a list"
                areaName="columnName"
              />
            ) : (
              <button
                className={styles.addColumnBtn}
                type="button"
                data-testid="list-composer-button"
                onClick={() =>
                  setState({
                    ...state,
                    isVisible: true,
                  })
                }
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="text-base font-semibold">
                  Add another column
                </span>
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
