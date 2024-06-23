import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import styles from "./TablePage.module.css";
import { useParams } from "react-router";
import { TableHeader } from "../../components/TableHeader/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FC, useState, useEffect } from "react";
import { IColumn } from "../../types/boardsTypes";
import { updateColumns } from "../../services/feature/boards/boardsSlice";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { ColumnList } from "../../components/ColumnList/ColumnList";

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

  useEffect(() => {
    if (currentBoard) {
      setState({
        ...state,
        boardColumns: currentBoard.columns,
      });
    }
  }, [currentBoard]);

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addNewColumn = () => {
    if (currentBoard) {
      const newColumn = { id: uuidv4(), title: state.columnName, tasks: [] };
      dispatch(
        updateColumns({
          boardId: currentBoard.id,
          columns: [...state.boardColumns, newColumn],
        })
      );
      setState({
        ...state,
        columnName: "",
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

  return (
    <>
      <div
        style={{ backgroundImage: `url(${currentBoard?.background.regular})` }}
        className={styles.board}
      >
        <TableHeader />
        <div className={cn(styles.columnsContainer, "px-6 py-5")}>
          <ul>
            {currentBoard?.columns.map((item) => (
              <ColumnList
                key={item.id}
                name={item.title}
                columnId={item.id}
                boardId={currentBoard.id}
                updateColumnName={updateColumnName}
              />
            ))}
          </ul>
          <AnimatePresence mode="wait">
            {state.isVisible ? (
              <motion.form
                className={styles.columnForm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <textarea
                  placeholder="Enter the title of the list"
                  autoComplete="off"
                  name="columnName"
                  className={styles.columnArea}
                  maxLength={512}
                  spellCheck={false}
                  dir="auto"
                  onChange={handleChangeValue}
                  value={state.columnName}
                ></textarea>
                <div className={styles.buttonsArea}>
                  <button
                    type="button"
                    className={styles.addListBtn}
                    onClick={addNewColumn}
                  >
                    Add a list
                  </button>
                  <FontAwesomeIcon
                    onClick={() =>
                      setState({
                        ...state,
                        isVisible: false,
                      })
                    }
                    icon={faXmark}
                    className={styles.areaIcon}
                  />
                </div>
              </motion.form>
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
