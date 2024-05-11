import { FC, PropsWithChildren } from "react";
import styles from "./BoardList.module.css";
import { BoardCard } from "../BoardCard/BoardCard";
import { v4 as uuidv4 } from "uuid";
import { IBoardColumn } from "../../types/boardTypes";

type TBoardListProps = {
  title?: string;
  subtitle?: string;
  array?: IBoardColumn[];
};

export const BoardList: FC<PropsWithChildren<TBoardListProps>> = ({
  title,
  subtitle,
  array,
  children,
}) => {
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
                name={item.name}
                descr={item?.purpose}
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
