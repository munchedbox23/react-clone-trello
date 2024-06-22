import { useAppSelector } from "../../services/store/hooks";
import styles from "./TablePage.module.css";
import { useParams } from "react-router";
import { TableHeader } from "../../components/TableHeader/TableHeader";

export const TablePage = () => {
  const { tableId } = useParams();
  const currentBoard = useAppSelector((store) => store.boards.boards).find(
    (board) => board.id === tableId
  );

  return (
    <div
      style={{ backgroundImage: `url(${currentBoard?.background.regular})` }}
      className={styles.board}
    >
      <TableHeader />
    </div>
  );
};
