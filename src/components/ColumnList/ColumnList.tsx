import { FC, useRef, useState } from "react";
import columnStyles from "./ColumnList.module.css";
import cn from "classnames";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

type TColumnListProps = {
  name: string;
  columnId: string;
  boardId: string;
  updateColumnName: (
    boardId: string,
    columnId: string,
    newName: string
  ) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
};

export const ColumnList: FC<TColumnListProps> = ({
  name,
  columnId,
  boardId,
  updateColumnName,
  deleteColumn,
}) => {
  const [columnState, setColumnState] = useState({
    isEditing: false,
    isOptionsOpen: false,
    columnName: name,
  });
  const { isEditing, columnName, isOptionsOpen } = columnState;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditActive = () => {
    setColumnState({
      ...columnState,
      isEditing: true,
    });
    textareaRef.current?.focus();
  };
  const handleEditSubmit = () => {
    if (columnName !== name) {
      updateColumnName(boardId, columnId, columnName);
    }
    setColumnState({
      ...columnState,
      isEditing: false,
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
              {columnName}
            </h2>
            <textarea
              className={cn(columnStyles.textArea, {
                [columnStyles.textEditing]: isEditing,
              })}
              dir="auto"
              maxLength={512}
              spellCheck={false}
              value={columnName}
              onChange={(e) =>
                setColumnState({
                  ...columnState,
                  columnName: e.target.value,
                })
              }
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
            onClick={() => deleteColumn(boardId, columnId)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </motion.div>
        )}
        <button className={cn(columnStyles.columnFooter)}>
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-base font-semibold">Add a card</span>
        </button>
      </div>
    </li>
  );
};
