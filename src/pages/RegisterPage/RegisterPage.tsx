import styles from "../LoginPage/LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { RegisterLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";

export const RegisterPage: FC = () => {
  return (
    <Form
      linkComponent={RegisterLinks}
      title="Register on Trello"
      onSubmit={(e) => console.log(e)}
    >
      <input
        autoComplete="name"
        type="text"
        name="name"
        placeholder="Name and Surname"
        className={styles.input}
        onChange={() => console.log(1)}
      />
      <input
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        className={styles.input}
      />
      <input
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
      />
      <AuthButton text="Sign Up" />
    </Form>
  );
};
