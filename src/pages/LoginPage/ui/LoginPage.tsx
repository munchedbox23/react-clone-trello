import { MForm } from "../../../components/Form/Form";
import { LoginLinks } from "../../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { IUserLogin } from "../../../entities/user/model/types/userTypes";
import { formVariants } from "../../../shared/helpers/animationVariants";
import { Input } from "munchedbox-ui";
import { useForm } from "../../../shared/hooks/useForm";
import { userLogin } from "../../../entities/user/api/userApi";

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
