import styles from "./Form.module.css";
import { PropsWithChildren, ElementType, FormEvent, forwardRef } from "react";
import { motion } from "framer-motion";
import { Button, Text } from "munchedbox-ui";

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
          <Text as="h2" weight="medium" size="3xl">
            {title}
          </Text>
          {children}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
        </form>
        {Links && <Links />}
      </div>
    );
  }
);

export const MForm = motion(Form);
