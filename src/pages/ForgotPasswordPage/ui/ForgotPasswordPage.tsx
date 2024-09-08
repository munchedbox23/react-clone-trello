import { MForm } from "../../../components/Form/Form";
import { ForgotLinks } from "../../../components/Form/FormLinks/FormLinks";
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE } from "../../../shared/helpers/constants";
import { Preloader } from "../../../shared/ui/Preloader/Preloader";
import { formVariants } from "../../../shared/helpers/animationVariants";
import { Input } from "munchedbox-ui";
import { useForm } from "../../../shared/hooks/useForm";
import { forgotPassword } from "../../../entities/user/api/userApi";

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
