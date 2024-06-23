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
};

interface IState {
  isEditing: boolean;
  isOptionsOpen: boolean;
  showAddMenu: boolean;
}

export const ColumnList: FC<TColumnListProps> = ({
  name,
  columnId,
  board,
  updateColumnName,
  deleteColumn,
  addCard,
  tasks,
}) => {
  const [columnState, setColumnState] = useState<IState>({
    isEditing: false,
    isOptionsOpen: false,
    showAddMenu: false,
  });
  const { isEditing, isOptionsOpen, showAddMenu } = columnState;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { formState, onChange, setFormState } = useForm<{
    columnName: string;
    cardName: string;
  }>({
    columnName: name,
    cardName: "",
  });

  const handleEditActive = () => {
    setColumnState({
      ...columnState,
      isEditing: true,
    });
    textareaRef.current?.focus();
  };

  const handleEditSubmit = () => {
    if (formState.columnName !== name) {
      updateColumnName(board.id, columnId, formState.columnName);
    }
    setColumnState({
      ...columnState,
      isEditing: false,
    });
  };

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

  return (
    <li data-testid="columnList" className={columnStyles.column}>
      <div className={cn(columnStyles.columnTarget, "px-2")}>
        <header className={columnStyles.header}>
          <div className={columnStyles.textContainer}>
            <h2
              className={cn(
                columnStyles.title,
                { [columnStyles.hidden]: isEditing },
                "text-base font-semibold"
              )}
              dir="auto"
              role="textbox"
              onClick={handleEditActive}
            >
              {formState.columnName}
            </h2>
            <textarea
              className={cn(columnStyles.textArea, {
                [columnStyles.textEditing]: isEditing,
              })}
              dir="auto"
              name="columnName"
              maxLength={512}
              spellCheck={false}
              value={formState.columnName}
              onChange={onChange}
              ref={textareaRef}
              onBlur={handleEditSubmit}
            ></textarea>
          </div>

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
            <ColumnCard key={task.id} cardName={task.title} />
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
