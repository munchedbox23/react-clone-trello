import styles from "./ProfilePage.module.css";
import inputStyles from "../LoginPage/LoginPage.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types/userTypes";
import { FormEvent, FC, useEffect, useState } from "react";
import { editUser } from "../../services/feature/user/auth";
import { ProfileButtons } from "../../ui/ProfileButtons/ProfileButtons";

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
  }, [formState]);

  useEffect(() => {
    if (user) {
      setFormState({ name: user.name, email: user.email });
    }
  }, [user]);

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
    <section className={`${styles.profilePage} pt-20`}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className="text-4xl font-medium underline">Profile Settings</h1>
        <input
          value={formState?.name || ""}
          type="text"
          name="name"
          className={inputStyles.input}
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          className={inputStyles.input}
          autoComplete="off"
          value={formState?.email || ""}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={inputStyles.input}
          autoComplete="new-password"
          value={formState?.password || ""}
          onChange={onChange}
        />
        <ProfileButtons isVisible={isVisible} onCancel={handleClose} />
      </form>
    </section>
  );
};
