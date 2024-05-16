import { FC, PropsWithChildren, useMemo } from "react";
import styles from "./BoardList.module.css";
import { MBoardCard } from "../BoardCard/BoardCard";
import { IBoard, IBoardTemplates } from "../../types/boardTypes";
import { useAppDispatch } from "../../services/store/hooks";
import {
  deleteBoard,
  deleteColumn,
} from "../../services/feature/board/boardSlice";
import { AnimatePresence } from "framer-motion";

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

  const mappingArray = useMemo(
    () =>
      array.map((item) => (
        <MBoardCard
          onDelete={handleDelete}
          hasOptions={options}
          data={item}
          key={item.id}
          initial={{ y: "-500px" }}
          animate={{ y: 0 }}
          exit={{ y: "-500px" }}
          transition={{ duration: 0.3 }}
        />
      )),
    [array]
  );

  return (
    <article className={`${styles.boardsList} mb-6`}>
      <header className={styles.heading}>
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="text-sm font-normal mb-7">{subtitle}</p>
      </header>

      <ul className={styles.list}>
        <AnimatePresence>{array && mappingArray}</AnimatePresence>
        {children}
      </ul>
    </article>
  );
};
