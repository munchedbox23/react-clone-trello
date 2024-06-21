import { FC, PropsWithChildren } from "react";
import styles from "./BoardList.module.css";
import { BoardCard } from "../BoardCard/BoardCard";
import { IBoard } from "../../types/boardsTypes";

type TBoardListProps<T> = {
  title?: string;
  subtitle?: string;
  options?: boolean;
  array: T[];
};

export const BoardList: FC<PropsWithChildren<TBoardListProps<IBoard>>> = ({
  title,
  subtitle,
  options,
  array,
  children,
}) => {
  return (
    <article className={`${styles.boardList} mt-6`}>
      <header className={styles.heading}>
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="text-sm font-normal mb-7">{subtitle}</p>
      </header>
      <ul className={styles.list}>
        {array &&
          array.map((item) => (
            <BoardCard data={item} hasOptions={options} key={item.id} />
          ))}
        {children}
      </ul>
    </article>
  );
};
