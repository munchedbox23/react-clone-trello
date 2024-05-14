import { FC, PropsWithChildren } from "react";
import styles from "./BoardList.module.css";
import { BoardCard } from "../BoardCard/BoardCard";
import { v4 as uuidv4 } from "uuid";
import { IBoard, IBoardTemplates } from "../../types/boardTypes";
import { useAppDispatch } from "../../services/store/hooks";
import {
  deleteBoard,
  deleteColumn,
} from "../../services/feature/board/boardSlice";

type TBoardListProps<T> = {
  title?: string;
  subtitle?: string;
  array: T[];
  options: boolean;
};

export const BoardList: FC<
  PropsWithChildren<TBoardListProps<IBoard | IBoardTemplates>>
> = ({ title, subtitle, array, children, options }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string, type: string) => {
    type === "board" ? dispatch(deleteBoard(id)) : dispatch(deleteColumn(id));
  };

  return (
    <article className={`${styles.boardsList} mb-6`}>
      <header className={styles.heading}>
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="text-sm font-normal mb-7">{subtitle}</p>
      </header>
      <ul className={styles.list}>
        {array && (
          <>
            {array.map((item) => (
              <BoardCard
                onDelete={handleDelete}
                hasOptions={options}
                data={item}
                key={uuidv4()}
              />
            ))}
          </>
        )}
        {children}
      </ul>
    </article>
  );
};
