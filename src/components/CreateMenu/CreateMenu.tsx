import { useAppDispatch, useAppSelector } from "../../app/appStore";
import { Form } from "../Form/Form";
import styles from "./CreateMenu.module.css";
import { useForm } from "../../hooks/useForm";
import { BackgroundOption } from "../../ui/BackgroundOption/BackgroundOption";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DotsLoader } from "../../ui/Preloader/DotsLoader/DotsLoader";
import { shallowEqual } from "react-redux";
import { postBoards } from "../../services/feature/boards/boardsSlice";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { IBackground } from "../../types/boardsTypes";
import { Input } from "munchedbox-ui";

export interface IFormBoard {
  name: string;
  background: IBackground;
  user: string;
}

export const CreateMenu = () => {
  const { modalContent, backgroundOptions, optionsLoading, user } =
    useAppSelector(
      (store) => ({
        modalContent: store.modal.modalContent,
        backgroundOptions: store.modal.backgroundOptions as IBackground[],
        optionsLoading: store.modal.optionsLoading,
        user: store.user.user,
      }),
      shallowEqual
    );
  const { formState, onChange, setFormState } = useForm<IFormBoard>({
    name: "",
    background: {
      raw: "",
      full: "",
      regular: "",
      small: "",
      thumb: "",
    },
    user: user ? user.email : "test@test.ru",
  });

  const [selectedBackground, setSelectedBackground] = useState<string>(
    formState.background.small
  );
  const dispatch = useAppDispatch();

  const handleBackgroundSelect = (background: IBackground) => {
    setSelectedBackground(background.small);
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
      background: {
        raw: "",
        full: "",
        regular: "",
        small: "",
        thumb: "",
      },
      user: user ? user.email : "test@test.ru",
    });
    dispatch(setModalOpen());
  };

  return (
    <Form
      modalForm={true}
      onSubmit={handleSubmit}
      title={modalContent?.title}
      isDisabled={!formState.name || !formState.background}
      buttonText="Save"
    >
      <Input
        autoComplete="off"
        type="text"
        name="name"
        placeholder={modalContent?.placeholder}
        value={formState?.name}
        onChange={onChange}
        variant="rounded"
      />
      <div className={`${styles.bgOptions} p-2`}>
        {!optionsLoading && backgroundOptions ? (
          backgroundOptions
            .slice(0, 8)
            .map((background, index) => (
              <BackgroundOption
                key={uuidv4()}
                imageSrc={background.small}
                name={`Option ${index + 1}`}
                isSelected={selectedBackground === background.small}
                onClick={() => handleBackgroundSelect(background)}
              />
            ))
        ) : (
          <DotsLoader />
        )}
      </div>
    </Form>
  );
};
