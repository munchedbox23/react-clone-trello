import styles from "./BoardPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BoardList } from "../../components/BoardList/BoardList";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { useAppSelector } from "../../services/store/hooks";

export const BoardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardColumns = useAppSelector((store) => store.board.boardColumns);
  const templates = useAppSelector((store) => store.board.templates);

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
      <BoardList
        array={boardColumns}
        title="My Table"
        subtitle="Here you can set up the columns that will be on the board"
      >
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
        array={templates}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <span>1</span>
        </Modal>
      )}
    </main>
  );
};
