import styles from "./BoardCard.module.css";
import { FC, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

type TBoardCardProps = {
  name: string;
  descr: string;
};

export const BoardCard: FC<PropsWithChildren<TBoardCardProps>> = ({
  name,
  descr,
  children,
}) => {
  return (
    <>
      <div className={`${styles.boardBtn} p-4`}>
        <h4 className="font-medium text-lg mb-3">{name}</h4>
        <FontAwesomeIcon icon={faEllipsis} className={styles.cardIcon} />
        <span
          className={`${styles.cardInfo} font-normal text-base pt-2 pb-3 pl-2`}
        >
          {descr}
        </span>
        {children}
      </div>
    </>
  );
};
