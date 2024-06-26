import styles from "../LoginPage/LoginPage.module.css";
import { MForm } from "../../components/Form/Form";
import { RegisterLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { useForm } from "../../hooks/useForm";
import { userRegister } from "../../services/feature/user/auth";
import { IUserRegister } from "../../types/userTypes";
import { formVariants } from "../../utils/animationVariants";

export const RegisterPage: FC = () => {
  const { formState, onChange, onSubmit, isFormValid } = useForm<IUserRegister>(
    {
      name: "",
      email: "",
      password: "",
    }
  );
  return (
    <MForm
      linkComponent={RegisterLinks}
      title="Register on Trello"
      onSubmit={(e) => onSubmit(e, userRegister)}
      initial={"back"}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
    >
      <input
        required
        autoComplete="name"
        type="text"
        name="name"
        placeholder="Name and Surname"
        className={styles.input}
        value={formState?.name}
        onChange={onChange}
      />
      <input
        required
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        className={styles.input}
        value={formState?.email}
        onChange={onChange}
      />
      <input
        required
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
        value={formState?.password}
        onChange={onChange}
      />
      <PrimaryButton isDisabled={!isFormValid} text="Sign Up" />
    </MForm>
  );
};
