import styles from "./BoardPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BoardCard } from "../../components/BoardCard/BoardCard";
import { BoardList } from "../../components/BoardList/BoardList";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { useAppSelector } from "../../services/store/hooks";

export const BoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardColumns = useAppSelector((store) => store.board.boardColumns);
  const boards = useAppSelector((store) => store.board.boards);

  return (
    <main className="pt-2">
      <BoardList>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.createBoard}
        >
          <span className="font-medium text-lg mr-2">Create new board</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </BoardList>
      <BoardList array={boardColumns} title="My Board">
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addColumn}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add another constructorList</span>
        </button>
      </BoardList>
      <BoardList
        title="Popular templates"
        subtitle=" Get doing faster with a template from the Trello community"
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <span>1</span>
        </Modal>
      )}
    </main>
  );
};
