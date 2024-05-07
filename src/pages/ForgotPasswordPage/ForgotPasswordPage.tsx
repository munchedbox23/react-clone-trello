import styles from "../LoginPage/LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { ForgotLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";

export const ForgotPasswordPage: FC = () => {
  return (
    <Form
      linkComponent={ForgotLinks}
      title="Recover Password"
      onSubmit={(e) => console.log(e)}
    >
      <input
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        className={styles.input}
      />
      <AuthButton text="Recover" />
    </Form>
  );
};
