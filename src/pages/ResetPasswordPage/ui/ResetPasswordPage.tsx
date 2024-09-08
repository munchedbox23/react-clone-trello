import { MForm } from "../../../components/Form/Form";
import { ForgotLinks } from "../../../components/Form/FormLinks/FormLinks";
import { FC, FormEvent } from "react";
import { resetPassword } from "../../../services/feature/user/auth";
import { Navigate, useNavigate } from "react-router";
import { ROUTE } from "../../../shared/helpers/constants";
import { formVariants } from "../../../shared/helpers/animationVariants";
import { Input } from "munchedbox-ui";
import { useForm } from "../../../shared/hooks/useForm";

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
    <MForm
      linkComponent={ForgotLinks}
      title="Recover Password"
      onSubmit={handleReset}
      isDisabled={!isFormValid}
      buttonText="Recover"
      initial={"back"}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
    >
      <Input
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
        value={formState.password}
        onChange={onChange}
      />
      <Input
        autoComplete="one-time-code"
        type="text"
        name="token"
        placeholder="Token"
        value={formState.token}
        onChange={onChange}
      />
    </MForm>
  ) : (
    <Navigate to={ROUTE.authLayout.forgotPassword} replace={true} />
  );
};
