import { useAppSelector } from "../../services/store/hooks";
import { Form } from "../Form/Form";
import styles from "./CreateMenu.module.css";
import { useForm } from "../../hooks/useForm";
import { PrimaryButton } from "../../ui";
import "../../pages/LoginPage/LoginPage.module.css";
import { BackgroundOption } from "../../ui/BackgroundOption/BackgroundOption";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DotsLoader } from "../../ui/Preloader/DotsLoader/DotsLoader";
import { shallowEqual } from "react-redux";

export const CreateMenu = () => {
  const { formState, onChange, setFormState } = useForm({
    name: "",
    background: "clck.ru/3BNSJH",
  });

  const [selectedBackground, setSelectedBackground] = useState<string>(
    formState.background
  );
  const { modalContent, backgroundOptions, optionsLoading } = useAppSelector(
    (store) => ({
      modalContent: store.modal.modalContent,
      backgroundOptions: store.modal.backgroundOptions,
      optionsLoading: store.modal.optionsLoading,
    }),
    shallowEqual
  );

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    setFormState({
      ...formState,
      background,
    });
  };

  return (
    <Form
      modalForm={true}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(backgroundOptions);
      }}
      title={modalContent?.title}
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
      <PrimaryButton isDisabled={false} text="Save" />
    </Form>
  );
};
