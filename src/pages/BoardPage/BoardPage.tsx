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

interface IBoardPageState {
  name: string;
  color: string;
  description?: string;
}

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { formState, onChange, onSubmit, setFormState } =
    useForm<IBoardPageState>({
      name: "",
      color: "",
      description: "",
    });

  const boardColumns = useAppSelector((store) => store.board.boardColumns);
  const templates = useAppSelector((store) => store.board.templates);
  const isModalOpen = useAppSelector((store) => store.modal.isModalOpen);
  const modalContent = useAppSelector((store) => store.modal.modalContent);

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };
  return (
    <main className="pt-2">
      <BoardList>
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
      />

      {isModalOpen && (
        <Modal
          onClose={() => {
            handleModalOpen();
            setFormState({ name: "", color: "" });
          }}
        >
          <Form
            title={modalContent?.title}
            modalForm={true}
            onSubmit={() => console.log(1)}
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
                  name="color"
                  value={formState?.color}
                  onChange={onChange}
                />
              </div>
            ) : (
              <input
                autoComplete="off"
                type="text"
                name="description"
                placeholder="Column description"
                className={styles.modalInput}
                value={formState?.description}
                onChange={onChange}
              />
            )}
            <PrimaryButton isDisabled={false} text={modalContent!.title} />
          </Form>
        </Modal>
      )}
    </main>
  );
};
