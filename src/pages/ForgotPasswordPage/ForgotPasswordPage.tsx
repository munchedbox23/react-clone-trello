import styles from "../LoginPage/LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { ForgotLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC, FormEvent, useState } from "react";
import { PrimaryButton } from "../../ui/PrimaryButton/PrimaryButton";
import { useForm } from "../../hooks/useForm";
import { forgotPassword } from "../../services/feature/user/auth";
import { useNavigate } from "react-router";
import { ROUTE } from "../../utils/constants";
import { Preloader } from "../../components/Preloader/Preloader";

export const ForgotPasswordPage: FC = () => {
  const { formState, setFormState, onChange, isFormValid } = useForm<{
    email: string;
  }>({
    email: "",
  });
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    if (isFormValid) {
      forgotPassword(formState.email).then((res) => {
        localStorage.setItem("forgotPassSuccess", JSON.stringify(res.message));
        navigate(ROUTE.authLayout.resetPassword);
        setFormState({ email: "" });
        setIsSending(false);
      });
    }
  };
  return isSending ? (
    <Preloader />
  ) : (
    <Form
      linkComponent={ForgotLinks}
      title="Recover Password"
      onSubmit={handleSubmit}
    >
      <input
        required
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        className={styles.input}
        value={formState?.email || ""}
        onChange={onChange}
      />
      <PrimaryButton isDisabled={!isFormValid} text="Recover" />
    </Form>
  );
};
