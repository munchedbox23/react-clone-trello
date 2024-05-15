import styles from "./BoardPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BoardList } from "../../components/BoardList/BoardList";
import { Modal } from "../../components/Modal/Modal";
import { useAppSelector } from "../../services/store/hooks";
import { useAppDispatch } from "../../services/store/hooks";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { Form } from "../../components/Form/Form";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { useForm } from "../../hooks/useForm";
import { FormEvent } from "react";
import {
  postBoards,
  postColumns,
} from "../../services/feature/board/boardSlice";
import { motion } from "framer-motion";

export interface IBoardPageState {
  name: string;
  background?: string;
  purpose?: string;
}

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { formState, onChange, setFormState } = useForm<IBoardPageState>({
    name: "",
    background: "#000000",
    purpose: "",
  });

  const boardColumns = useAppSelector((store) => store.board.boardColumns);
  const templates = useAppSelector((store) => store.board.templates);
  const boards = useAppSelector((store) => store.board.boards);

  const isModalOpen = useAppSelector((store) => store.modal.isModalOpen);
  const modalContent = useAppSelector((store) => store.modal.modalContent);

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalContent?.content === "create-board") {
      dispatch(postBoards(formState));
    } else {
      dispatch(postColumns(formState));
    }
    setFormState({
      name: "",
      background: "#fff",
      purpose: "",
    });
    dispatch(setModalOpen());
  };

  return (
    <motion.section
      className="pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BoardList options array={boards}>
        <button
          onClick={() => handleModalOpen("create-board")}
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
        options
      >
        <button
          onClick={() => handleModalOpen("add-column")}
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
        options={false}
      />

      {isModalOpen && (
        <Modal
          onClose={() => {
            handleModalOpen();
            setFormState({ name: "", background: "" });
          }}
        >
          <Form
            title={modalContent?.title}
            modalForm={true}
            onSubmit={onSubmit}
          >
            <input
              autoComplete="off"
              type="text"
              name="name"
              placeholder={modalContent?.placeholder}
              className={styles.modalInput}
              value={formState?.name}
              onChange={onChange}
            />
            {modalContent?.title === "Create Board" ? (
              <div className={styles.selectColor}>
                <label className="font-medium text-base">
                  Choose Board Color:
                </label>
                <input
                  type="color"
                  name="background"
                  value={formState?.background}
                  onChange={onChange}
                />
              </div>
            ) : (
              <input
                autoComplete="off"
                type="text"
                name="purpose"
                placeholder="Column description"
                className={styles.modalInput}
                value={formState?.purpose}
                onChange={onChange}
              />
            )}
            <PrimaryButton isDisabled={false} text="Save" />
          </Form>
        </Modal>
      )}
    </motion.section>
  );
};
