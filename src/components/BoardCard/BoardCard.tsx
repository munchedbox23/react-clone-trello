import styles from "./BoardCard.module.css";
import { FC, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { IBoardColumn, IBoardTemplates } from "../../types/boardTypes";

type TBoardCardProps = {
  data: IBoardColumn | IBoardTemplates;
};

export const BoardCard: FC<PropsWithChildren<TBoardCardProps>> = ({
  data,
  children,
}) => {
  
  return (
    <>
      <div
        style={{ backgroundImage: `url(${data.background})` }}
        className={`${styles.boardBtn} p-4`}
      >
        <h4 className="font-medium text-lg mb-3">{data.name}</h4>
        <FontAwesomeIcon icon={faEllipsis} className={styles.cardIcon} />
        <span
          className={`${styles.cardInfo} font-normal text-base pt-2 pb-3 pl-2`}
        >
          {data.purpose}
        </span>
        {children}
      </div>
    </>
  );
};
