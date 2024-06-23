import formStyles from "./CardForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, ChangeEvent } from "react";
import { motion } from "framer-motion";

type TCardFormProps = {
  value: string;
  onClose: () => void;
  handleChangeValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
  buttonText: string;
  areaName: string;
};

export const CardForm = forwardRef<HTMLFormElement, TCardFormProps>(
  (
    { value, handleChangeValue, onClick, onClose, buttonText, areaName },
    ref
  ) => {
    return (
      <form ref={ref} className={formStyles.columnForm}>
        <textarea
          placeholder="Enter the title of the list"
          autoComplete="off"
          name={areaName}
          className={formStyles.columnArea}
          maxLength={512}
          spellCheck={false}
          dir="auto"
          onChange={handleChangeValue}
          value={value}
        ></textarea>
        <div className={formStyles.buttonsArea}>
          <button
            type="button"
            className={formStyles.addListBtn}
            onClick={onClick}
          >
            {buttonText}
          </button>
          <FontAwesomeIcon
            onClick={onClose}
            icon={faXmark}
            className={formStyles.areaIcon}
          />
        </div>
      </form>
    );
  }
);

export const MCardForm = motion(CardForm);
