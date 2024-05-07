import styles from "../LoginPage/LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { ForgotLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";

export const ResetPasswordPage: FC = () => {
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
      <input
        autoComplete="one-time-code"
        type="text"
        name="token"
        placeholder="Token"
        className={styles.input}
      />
      <AuthButton text="Recover" />
    </Form>
  );
};
