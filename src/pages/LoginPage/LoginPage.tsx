import styles from "./LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { LoginLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";

export const LoginPage: FC = () => {
  return (
    <Form
      linkComponent={LoginLinks}
      title="Log in to Trello"
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
        autoComplete="current-password"
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
      />
      <AuthButton text="Login" />
    </Form>
  );
};
