import { FC } from "react";
import styles from "./ColumnCard.module.css";

type TColumnCard = {
  cardName: string;
};

export const ColumnCard: FC<TColumnCard> = ({ cardName }) => {
  return (
    <li data-testid="list-card" className={styles.columnCard}>
      <div
        role="button"
        data-testid="trello-card"
        className={styles.trelloCard}
      >
        <p className="text-base font-normal">{cardName}</p>
      </div>
    </li>
  );
};
