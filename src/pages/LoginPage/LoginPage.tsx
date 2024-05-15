import styles from "./LoginPage.module.css";
import { MForm } from "../../components/Form/Form";
import { LoginLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { useForm } from "../../hooks/useForm";
import { userLogin } from "../../services/feature/user/auth";
import { IUserLogin } from "../../types/userTypes";
import { formVariants } from "../../utils/animationVariants";

export const LoginPage: FC = () => {
  const { formState, onChange, onSubmit, isFormValid } = useForm<IUserLogin>({
    email: "",
    password: "",
  });
  return (
    <MForm
      linkComponent={LoginLinks}
      title="Log in to Trello"
      onSubmit={(e) => onSubmit(e, userLogin)}
      initial={"back"}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
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
      <PrimaryButton isDisabled={!isFormValid} text="Login" />
    </MForm>
  );
};
