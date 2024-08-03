import { MForm } from "../../components/Form/Form";
import { ForgotLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC, FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { forgotPassword } from "../../services/feature/user/auth";
import { useNavigate } from "react-router";
import { ROUTE } from "../../utils/constants";
import { Preloader } from "../../ui/Preloader/Preloader";
import { formVariants } from "../../utils/animationVariants";
import { Input } from "munchedbox-ui";

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
    <MForm
      linkComponent={ForgotLinks}
      title="Recover Password"
      onSubmit={handleSubmit}
      initial={"back"}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
      buttonText="Recover"
      isDisabled={!isFormValid}
    >
      <Input
        required
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formState?.email || ""}
        onChange={onChange}
        variant="rounded"
      />
    </MForm>
  );
};
