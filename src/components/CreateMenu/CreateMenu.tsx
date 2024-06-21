import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { Form } from "../Form/Form";
import styles from "./CreateMenu.module.css";
import { useForm } from "../../hooks/useForm";
import { PrimaryButton } from "../../ui";
import "../../pages/LoginPage/LoginPage.module.css";
import { BackgroundOption } from "../../ui/BackgroundOption/BackgroundOption";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DotsLoader } from "../../ui/Preloader/DotsLoader/DotsLoader";
import { shallowEqual } from "react-redux";
import { postBoards } from "../../services/feature/boards/boardsSlice";
import { setModalOpen } from "../../services/feature/modal/modalSlice";

export interface IFormBoard {
  name: string;
  background: string;
  user: string;
}

export const CreateMenu = () => {
  const { modalContent, backgroundOptions, optionsLoading, user } =
    useAppSelector(
      (store) => ({
        modalContent: store.modal.modalContent,
        backgroundOptions: store.modal.backgroundOptions,
        optionsLoading: store.modal.optionsLoading,
        user: store.user.user,
      }),
      shallowEqual
    );
  const { formState, onChange, setFormState } = useForm<IFormBoard>({
    name: "",
    background: "",
    user: user ? user.email : "test@test.ru",
  });

  const [selectedBackground, setSelectedBackground] = useState<string>(
    formState.background
  );
  const dispatch = useAppDispatch();

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    setFormState({
      ...formState,
      background,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postBoards(formState));
    setFormState({
      name: "",
      background: "",
      user: user ? user.email : "test@test.ru",
    });
    dispatch(setModalOpen());
  };

  return (
    <Form modalForm={true} onSubmit={handleSubmit} title={modalContent?.title}>
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
        <div className={`${styles.bgOptions} p-2`}>
          {!optionsLoading ? (
            backgroundOptions
              .slice(0, 8)
              .map((background, index) => (
                <BackgroundOption
                  key={uuidv4()}
                  imageSrc={background}
                  name={`Option ${index + 1}`}
                  isSelected={selectedBackground === background}
                  onClick={() => handleBackgroundSelect(background)}
                />
              ))
          ) : (
            <DotsLoader />
          )}
        </div>
      ) : (
        <input
          autoComplete="off"
          type="text"
          name="purpose"
          placeholder="Column description"
          className={styles.modalInput}
          // value={formState?.purpose}
          // onChange={onChange}
        />
      )}
      <PrimaryButton
        isDisabled={!formState.name || !formState.background}
        text="Save"
      />
    </Form>
  );
};
