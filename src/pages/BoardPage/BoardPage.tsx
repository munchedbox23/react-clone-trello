import { FC } from "react";
import styles from "./BoardPage.module.css";
import { motion } from "framer-motion";
import { BoardList } from "../../components/BoardList/BoardList";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { shallowEqual } from "react-redux";
import { Modal } from "../../components/Modal/Modal";
import { CreateMenu } from "../../components/CreateMenu/CreateMenu";
import { selectBoardsByUser } from "../../services/feature/boards/boardSelectors";
import { useAppDispatch, useAppSelector } from "../../app/appStore";
import { Text } from "munchedbox-ui";

export const BoardPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, templates } = useAppSelector(
    (store) => ({
      isModalOpen: store.modal.isModalOpen,
      templates: store.boards.templates,
    }),
    shallowEqual
  );

  const filteredBoardsByUser = useAppSelector(selectBoardsByUser);

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };

  return (
    <motion.section
      className="pt-2 overflow-hidden w-full max-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BoardList
        title="My boards"
        subtitle="Here you can manage your boards"
        options
        array={filteredBoardsByUser}
      >
        <button
          onClick={() => handleModalOpen("create-board")}
          className={styles.createBtn}
        >
          <Text weight="medium" size="lg" className="mr-2">
            Create new board
          </Text>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </BoardList>
      <BoardList
        title="Popular templates"
        subtitle=" Get doing faster with a template from the Trello community"
        array={templates}
        options={false}
      ></BoardList>
      {isModalOpen && (
        <Modal onClose={() => handleModalOpen()}>
          <CreateMenu />
        </Modal>
      )}
    </motion.section>
  );
};
