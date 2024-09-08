import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FC, useState, useEffect } from "react";
import { IBoard, IColumn } from "../../app/types/boardsTypes";
import { updateColumns } from "../../services/feature/boards/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { ColumnList } from "../../components/ColumnList/ColumnList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Modal } from "../../components/Modal/Modal";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";
import { Stack, Button, Text } from "munchedbox-ui";
import {
  useAppSelector,
  useAppDispatch,
} from "../../app/providers/StoreProvider";
import { useForm } from "../../shared/hooks/useForm";
import { MCardForm } from "../../shared/ui/CardForm/CardForm";
import { TableHeader } from "../../widgets/TableHeader";

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
    (board: IBoard) => board.id === tableId
  );
  const isModalOpen = useAppSelector((store) => store.modal?.isModalOpen);
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

  const updateTaskName = (
    boardId: string,
    columnId: string,
    taskId: string,
    newName: string
  ) => {
    const updatedColumns = state.boardColumns.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId ? { ...task, title: newName } : task
            ),
          }
        : column
    );
    dispatch(updateColumns({ boardId, columns: updatedColumns }));
  };

  const moveColumn = (
    boardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => {
    const temp = state.boardColumns[dragIndex];
    const updatedColumns = [...state.boardColumns];
    updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, temp);
    dispatch(updateColumns({ boardId, columns: updatedColumns }));
    setState({
      ...state,
      boardColumns: updatedColumns,
    });
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${currentBoard?.background.regular})` }}
        className="w-screen h-screen bg-cover bg-no-repeat bg-center"
      >
        <TableHeader />
        <Stack
          direction="row"
          align="start"
          spacing="md"
          className="w-full px-6 py-5 h-table overflow-x-auto"
        >
          <DndProvider backend={HTML5Backend}>
            <ol className="flex h-full items-center">
              {currentBoard?.columns.map((item: IColumn, index: number) => (
                <ColumnList
                  index={index}
                  key={item.id}
                  name={item.title}
                  columnId={item.id}
                  board={currentBoard}
                  updateColumnName={updateColumnName}
                  deleteColumn={deleteColumn}
                  addCard={addNewCard}
                  tasks={item.tasks}
                  moveColumn={moveColumn}
                />
              ))}
            </ol>
          </DndProvider>

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
              <Button
                type="button"
                size="sm"
                variant="secondary"
                data-testid="list-composer-button"
                className="min-w-40"
                onClick={() => {
                  setState({
                    ...state,
                    isVisible: true,
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                <Text size="base" weight="semibold">
                  Add another column
                </Text>
              </Button>
            )}
          </AnimatePresence>
        </Stack>
      </div>
      {isModalOpen && (
        <Modal onClose={() => dispatch(setModalOpen())}>
          <TaskDetails onUpdateTaskName={updateTaskName} />
        </Modal>
      )}
    </>
  );
};
