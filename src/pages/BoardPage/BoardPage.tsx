import { FC } from "react";
import styles from "./BoardPage.module.css";
import { motion } from "framer-motion";
import { BoardList } from "../../components/BoardList/BoardList";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSleigh } from "@fortawesome/free-solid-svg-icons";

export const BoardPage: FC = () => {
  const dispatch = useAppDispatch();

  const { boards, templates } = useAppSelector((store) => ({
    boards: store.boards.boards,
    templates: store.boards.templates,
  }));

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };
  return (
    <motion.section
      className="pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BoardList
        title="My boards"
        subtitle="Here you can manage your boards"
        options
        array={boards}
      >
        <button
          onClick={() => handleModalOpen("create-board")}
          className={styles.createBtn}
        >
          <span className="font-medium text-lg mr-2">Create new board</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </BoardList>
      <BoardList
        title="Popular templates"
        subtitle=" Get doing faster with a template from the Trello community"
        array={templates}
        options={false}
      ></BoardList>
    </motion.section>
  );
};
