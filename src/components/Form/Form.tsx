import styles from "./Form.module.css";
import { PropsWithChildren, FC, FormEvent, ElementType } from "react";

type TFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title?: string;
  linkComponent?: ElementType;
  modalForm?: boolean;
};

export const Form: FC<PropsWithChildren<TFormProps>> = ({
  children,
  modalForm,
  onSubmit,
  title,
  linkComponent: Links,
}) => {
  return (
    <div
      className={`${styles.formWrapper} ${
        modalForm ? styles.modalForm : "mt-20"
      } pt-5`}
    >
      <form className={`${styles.form} `} onSubmit={onSubmit}>
        <h2 className="font-medium text-3xl mb-5 text-gray-600">{title}</h2>
        {children}
      </form>
      {Links && <Links />}
    </div>
  );
};
