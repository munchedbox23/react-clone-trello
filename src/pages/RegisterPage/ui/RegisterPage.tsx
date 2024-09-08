import { FC } from "react";
import { Input } from "munchedbox-ui";
import { MForm } from "../../../components/Form/Form";
import { RegisterLinks } from "../../../components/Form/FormLinks/FormLinks";
import { IUserRegister } from "../../../entities/user";
import { userRegister } from "../../../entities/user/api/userApi";
import { formVariants } from "../../../shared/helpers/animationVariants";
import { useForm } from "../../../shared/hooks/useForm";

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
