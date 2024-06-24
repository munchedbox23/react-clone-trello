import { FC, useRef, useState } from "react";
import columnStyles from "./ColumnList.module.css";
import cn from "classnames";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { MCardForm } from "../../ui/CardForm/CardForm";
import { useForm } from "../../hooks/useForm";
import { IBoard, ITask } from "../../types/boardsTypes";
import { ColumnCard } from "../ColumnCard/ColumnCard";
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "dnd-core";
import { EditableTitle } from "../../ui/EditableTitle/EditableTitle";

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
      className={columnStyles.column}
      style={{ opacity }}
      ref={dndRef}
    >
      <div className={cn(columnStyles.columnTarget, "px-2")}>
        <header className={columnStyles.header}>
          <EditableTitle
            initialValue={name}
            inputName="columnName"
            updateName={(newName) =>
              updateColumnName(board.id, columnId, newName)
            }
          />
          <FontAwesomeIcon
            className={columnStyles.columnIcon}
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
            className={columnStyles.options}
            initial={{ y: "-20px" }}
            animate={{ y: 0 }}
            exit={{ y: "-20px" }}
            onClick={() => deleteColumn(board.id, columnId)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </motion.div>
        )}
        <ol className={columnStyles.cardList}>
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
            className={cn(columnStyles.columnFooter, "mt-3")}
            onClick={() =>
              setColumnState((prevState) => ({
                ...prevState,
                showAddMenu: true,
              }))
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="text-base font-semibold">Add a card</span>
          </button>
        )}
      </div>
    </li>
  );
};
