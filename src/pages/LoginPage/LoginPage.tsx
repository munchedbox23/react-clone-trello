import { MForm } from "../../components/Form/Form";
import { LoginLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { useForm } from "../../hooks/useForm";
import { userLogin } from "../../services/feature/user/auth";
import { IUserLogin } from "../../types/userTypes";
import { formVariants } from "../../utils/animationVariants";
import { Input } from "munchedbox-ui";

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
      buttonText="Login"
      isDisabled={!isFormValid}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
    >
      <Input
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formState.email || ""}
        onChange={onChange}
        variant="rounded"
      />
      <Input
        autoComplete="current-password"
        type="password"
        name="password"
        placeholder="Password"
        value={formState.password || ""}
        onChange={onChange}
        variant="rounded"
        required
      />
    </MForm>
  );
};
