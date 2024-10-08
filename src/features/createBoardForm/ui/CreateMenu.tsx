import { Form } from "../../../components/Form/Form";
import { BackgroundOption } from "../../../shared/ui/BackgroundOption/BackgroundOption";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shallowEqual } from "react-redux";
import { postBoards } from "../../../entities/boards/model/slice/boardsSlice";
import { setModalOpen } from "../model/slice/modalSlice";
import { IBackground } from "../../../entities/boards/model/types/boardsTypes";
import { Input, Stack } from "munchedbox-ui";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../app/providers/StoreProvider";
import { useForm } from "../../../shared/hooks/useForm";
import { DotsLoader } from "../../../shared/ui/Preloader/DotsLoader/DotsLoader";

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
      <Stack
        direction="row"
        spacing="sm"
        align="center"
        justify="center"
        className="p-2 flex-wrap overflow-auto w-full max-w-96 max-h-44"
      >
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
      </Stack>
    </Form>
  );
};
