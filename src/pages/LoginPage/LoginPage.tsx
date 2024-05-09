import styles from "./LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { LoginLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";
import { useForm } from "../../hooks/useForm";
import { userLogin } from "../../services/feature/user/auth";
import { IUserLogin } from "../../types/userTypes";

export const LoginPage: FC = () => {
  const { formState, onChange, onSubmit, isFormValid } = useForm<IUserLogin>({
    email: "",
    password: "",
  });
  return (
    <Form
      linkComponent={LoginLinks}
      title="Log in to Trello"
      onSubmit={(e) => onSubmit(e, userLogin)}
    >
      <input
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        className={styles.input}
        value={formState.email || ""}
        onChange={onChange}
      />
      <input
        autoComplete="current-password"
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
        value={formState.password || ""}
        onChange={onChange}
      />
      <AuthButton isDisabled={!isFormValid} text="Login" />
    </Form>
  );
};
