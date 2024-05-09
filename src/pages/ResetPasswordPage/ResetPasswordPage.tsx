import styles from "../LoginPage/LoginPage.module.css";
import { Form } from "../../components/Form/Form";
import { ForgotLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC, FormEvent } from "react";
import { AuthButton } from "../../ui/AuthButton/AuthButton";
import { resetPassword } from "../../services/feature/user/auth";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { ROUTE } from "../../utils/constants";

export const ResetPasswordPage: FC = () => {
  const { formState, isFormValid, onChange, setFormState } = useForm<{
    password: string;
    token: string;
  }>({
    password: "",
    token: "",
  });
  const navigate = useNavigate();
  const forgotSuccess: string | null =
    localStorage.getItem("forgotPassSuccess");

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(formState)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("forgotPassSuccess");
          navigate(ROUTE.authLayout.login, { replace: true });
          setFormState({
            password: "",
            token: "",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return forgotSuccess ? (
    <Form
      linkComponent={ForgotLinks}
      title="Recover Password"
      onSubmit={handleReset}
    >
      <input
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
        value={formState.password}
        onChange={onChange}
      />
      <input
        autoComplete="one-time-code"
        type="text"
        name="token"
        placeholder="Token"
        className={styles.input}
        value={formState.token}
        onChange={onChange}
      />
      <AuthButton isDisabled={!isFormValid} text="Recover" />
    </Form>
  ) : (
    <Navigate to={ROUTE.authLayout.forgotPassword} replace={true} />
  );
};
