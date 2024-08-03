import { MForm } from "../../components/Form/Form";
import { RegisterLinks } from "../../components/Form/FormLinks/FormLinks";
import { FC } from "react";
import { useForm } from "../../hooks/useForm";
import { userRegister } from "../../services/feature/user/auth";
import { IUserRegister } from "../../types/userTypes";
import { formVariants } from "../../utils/animationVariants";
import { Input } from "munchedbox-ui";

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
      isDisabled={!isFormValid}
      buttonText="Sign Up"
      initial={"back"}
      animate={"front"}
      exit={"back"}
      variants={formVariants}
      transition={{ duration: 0.5 }}
    >
      <Input
        required
        autoComplete="name"
        type="text"
        name="name"
        placeholder="Name and Surname"
        value={formState?.name}
        onChange={onChange}
      />
      <Input
        required
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formState?.email}
        onChange={onChange}
      />
      <Input
        required
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
        value={formState?.password}
        onChange={onChange}
      />
    </MForm>
  );
};
