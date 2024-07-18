import styles from "./Form.module.css";
import { PropsWithChildren, ElementType, FormEvent, forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../../ui";

type TFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title?: string;
  linkComponent?: ElementType;
  modalForm?: boolean;
  isDisabled: boolean;
  buttonText: string;
};

export const Form = forwardRef<HTMLDivElement, PropsWithChildren<TFormProps>>(
  (
    {
      children,
      modalForm,
      onSubmit,
      title,
      linkComponent: Links,
      buttonText,
      isDisabled,
    },
    ref
  ) => {
    return (
      <div
        className={`${styles.formWrapper} ${
          modalForm ? styles.modalForm : "mt-20"
        } pt-5`}
        ref={ref}
      >
        <form className={`${styles.form} `} onSubmit={onSubmit}>
          <h2 className="font-medium text-3xl mb-5 text-gray-600">{title}</h2>
          {children}
          <Button
            type="submit"
            variant="solid"
            colorscheme="primary"
            size="md"
            label={buttonText}
            disabled={isDisabled}
          />
        </form>
        {Links && <Links />}
      </div>
    );
  }
);

export const MForm = motion(Form);
