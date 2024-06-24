import { FC, useRef, useState } from "react";
import styles from "./EditableTitle.module.css";
import cn from "classnames";
import { useForm } from "../../hooks/useForm";

type TEditableTitle = {
  inputName: string;
  initialValue: string;
  updateName: (newName: string) => void;
};

export const EditableTitle: FC<TEditableTitle> = ({
  inputName,
  initialValue,
  updateName,
}) => {
  const textareaRef = useRef<HTMLInputElement>(null);
  const { formState, onChange } = useForm({
    [inputName]: initialValue,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditActive = () => {
    setIsEditing(true);
    textareaRef.current?.focus();
  };

  const handleEditSubmit = () => {
    if (formState[inputName] !== initialValue) {
      updateName(formState[inputName]);
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.textContainer}>
      <h2
        className={cn(
          styles.title,
          { [styles.hidden]: isEditing },
          "text-base font-semibold"
        )}
        dir="auto"
        role="textbox"
        onClick={handleEditActive}
      >
        {formState[inputName]}
      </h2>
      <input
        className={cn(styles.textArea, {
          [styles.textEditing]: isEditing,
        })}
        dir="auto"
        name={inputName}
        maxLength={512}
        spellCheck={false}
        value={formState[inputName]}
        onChange={onChange}
        ref={textareaRef}
        onBlur={handleEditSubmit}
      />
    </div>
  );
};
