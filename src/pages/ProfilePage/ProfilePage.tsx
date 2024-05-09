import styles from "./ProfilePage.module.css";
import inputStyles from "../LoginPage/LoginPage.module.css";
import { useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../hooks/useForm";
import { IUser } from "../../types/userTypes";
import { FC, useEffect, useState } from "react";
import { editUser } from "../../services/feature/user/auth";
import { ProfileButtons } from "../../ui/ProfileButtons/ProfileButtons";

interface IProfileForm extends IUser {
  password?: string;
}

export const ProfilePage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { formState, onChange, setFormState, onSubmit } = useForm<IProfileForm>(
    {
      name: "",
      email: "",
      password: "",
    }
  );
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

  return (
    <section className={`${styles.profilePage} pt-20`}>
      <form onSubmit={(e) => onSubmit(e, editUser)} className={styles.form}>
        <h1 className="text-4xl font-medium underline">Profile Info</h1>
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
