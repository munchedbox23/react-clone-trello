import { FC, useRef, useState } from "react";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { IBoard, ITask } from "../../app/types/boardsTypes";
import { ColumnCard } from "../ColumnCard/ColumnCard";
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "dnd-core";
import { EditableTitle } from "../../shared/ui/EditableTitle/EditableTitle";
import { Stack, Text } from "munchedbox-ui";
import { useForm } from "../../shared/hooks/useForm";
import { MCardForm } from "../../shared/ui/CardForm/CardForm";

type TColumnListProps = {
  name: string;
  columnId: string;
  board: IBoard;
  updateColumnName: (
    boardId: string,
    columnId: string,
    newName: string
  ) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  addCard: (boardId: string, columnId: string, card: string) => void;
  tasks: ITask[];
  index: number;
  moveColumn: (boardId: string, dragIndex: number, hoverIndex: number) => void;
};

interface IState {
  isOptionsOpen: boolean;
  showAddMenu: boolean;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export const ColumnList: FC<TColumnListProps> = ({
  name,
  columnId,
  board,
  updateColumnName,
  deleteColumn,
  addCard,
  tasks,
  index,
  moveColumn,
}) => {
  const [columnState, setColumnState] = useState<IState>({
    isOptionsOpen: false,
    showAddMenu: false,
  });
  const { isOptionsOpen, showAddMenu } = columnState;
  const dndRef = useRef<HTMLLIElement>(null);
  const { formState, onChange, setFormState } = useForm<{
    cardName: string;
  }>({
    cardName: "",
  });

  const handleAddCard = () => {
    addCard(board.id, columnId, formState.cardName);
    setColumnState({
      ...columnState,
      showAddMenu: false,
    });
    setFormState({
      ...formState,
      cardName: "",
    });
  };

  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "column",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: IDragItem, monitor) {
      if (!dndRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dndRef.current.getBoundingClientRect();

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

      moveColumn(board.id, dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "column",
    item: () => {
      return { columnId, index };
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(dndRef));

  return (
    <li
      data-handler-id={handlerId}
      data-testid="columnList"
      className="block shrink-0 self-start pr-1.5 h-full whitespace-nowrap"
      style={{ opacity }}
      ref={dndRef}
    >
      <Stack
        direction="column"
        justify="between"
        className="px-2 relative w-72 max-h-full pb-2 rounded-xl whitespace-normal scroll-m-2 align-top text-blue-900 bg-gray-100 shadow-trello-column"
      >
        <header className="flex relative grow-0 pt-2 pr-0.5 flex-wrap items-start justify-between gap-x-0 mb-2">
          <EditableTitle
            initialValue={name}
            inputName="columnName"
            updateName={(newName) =>
              updateColumnName(board.id, columnId, newName)
            }
          />
          <FontAwesomeIcon
            className="p-1 rounded-lg grow-0 shrink-0 cursor-pointer bg-transparent text-slate-500 hover:text-slate-600 hover:bg-black-primary"
            icon={faEllipsis}
            onClick={() =>
              setColumnState((prevState) => ({
                ...prevState,
                isOptionsOpen: !prevState.isOptionsOpen,
              }))
            }
          />
        </header>
        {isOptionsOpen && (
          <motion.div
            className="absolute z-20 top-12 right-2 cursor-pointer w-9 h-9 rounded-lg pt-1.5 pr-0.5 pb-0.5 pl-3 bg-neutral-300 ease-linear duration-100 transition-background-color hover:bg-neutral-200"
            initial={{ y: "-20px" }}
            animate={{ y: 0 }}
            exit={{ y: "-20px" }}
            onClick={() => deleteColumn(board.id, columnId)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
          </motion.div>
        )}
        <ol className="flex gap-2 flex-col">
          {tasks.map((task) => (
            <ColumnCard
              key={task.id}
              task={task}
              boardId={board.id}
              columnId={columnId}
            />
          ))}
        </ol>
        {showAddMenu ? (
          <MCardForm
            handleChangeValue={onChange}
            onClose={() =>
              setColumnState((prevState) => ({
                ...prevState,
                showAddMenu: false,
              }))
            }
            onClick={handleAddCard}
            value={formState.cardName}
            buttonText="Add a card"
            areaName="cardName"
          />
        ) : (
          <button
            className="mt-3 flex grow-1 justify-start items-center rounded-lg bg-black-primary gap-1 w-full pt-1 pr-3 pb-1 pl-2 text-slate-600"
            onClick={() =>
              setColumnState((prevState) => ({
                ...prevState,
                showAddMenu: true,
              }))
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <Text size="base" weight="semibold">
              Add a card
            </Text>
          </button>
        )}
      </Stack>
    </li>
  );
};
