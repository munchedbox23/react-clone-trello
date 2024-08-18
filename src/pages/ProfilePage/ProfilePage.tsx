import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types/userTypes";
import { FormEvent, FC, useEffect, useState } from "react";
import { editUser } from "../../services/feature/user/auth";
import { ProfileButtons } from "../../ui/ProfileButtons/ProfileButtons";
import { motion } from "framer-motion";
import { inputVariants } from "../../utils/animationVariants";
import { MInput } from "munchedbox-ui";
import { useAppDispatch, useAppSelector } from "../../app/appStore";

export interface IProfileForm extends IUser {
  password?: string;
}

export const ProfilePage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { formState, onChange, setFormState } = useForm<IProfileForm>({
    name: "",
    email: "",
    password: "",
  });
  const user = useAppSelector((store) => store.user.user);

  useEffect(() => {
    if (
      formState?.email !== user?.email ||
      formState?.name !== user?.name ||
      formState.password
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formState, user]);

  useEffect(() => {
    if (user) {
      setFormState({ name: user.name, email: user.email });
    }
  }, [user, setFormState]);

  const handleClose = (): void => {
    setFormState({
      name: user!.name,
      email: user!.email,
      password: "",
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editUser(formState));
  };

  return (
    <motion.section
      className="flex flex-col items-center max-w-full w-4/5 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
        <motion.h1
          className="text-4xl font-medium underline"
          initial={{ y: "-200px" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Profile Settings
        </motion.h1>
        <MInput
          value={formState?.name || ""}
          type="text"
          name="name"
          onChange={onChange}
          variants={inputVariants}
          animate="visible"
          initial="hidden"
          custom={1}
        />
        <MInput
          type="email"
          name="email"
          autoComplete="new-email"
          value={formState?.email || ""}
          onChange={onChange}
          variants={inputVariants}
          animate="visible"
          initial="hidden"
          custom={2}
        />
        <MInput
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formState?.password || ""}
          onChange={onChange}
          variants={inputVariants}
          animate="visible"
          initial="hidden"
          custom={3}
        />
        <ProfileButtons isVisible={isVisible} onCancel={handleClose} />
      </form>
    </motion.section>
  );
};
