import { FC } from "react";
import styles from "./ColumnCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon
          className={`${styles.editIcon} ${styles.hidden}`}
          icon={faHighlighter}
        />
      </div>
    </li>
  );
};
