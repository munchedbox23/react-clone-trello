import { FC, useRef, useState } from "react";
import columnStyles from "./ColumnList.module.css";
import cn from "classnames";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TColumnListProps = {
  name: string;
  columnId: string;
  boardId: string;
  updateColumnName: (
    boardId: string,
    columnId: string,
    newName: string
  ) => void;
};

export const ColumnList: FC<TColumnListProps> = ({
  name,
  columnId,
  boardId,
  updateColumnName,
}) => {
  const [columnState, setColumnState] = useState({
    isEditing: false,
    columnName: name,
  });
  const { isEditing, columnName } = columnState;
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
          />
        </header>

        <button className={cn(columnStyles.columnFooter)}>
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-base font-semibold">Add a card</span>
        </button>
      </div>
    </li>
  );
};
