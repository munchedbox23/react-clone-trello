import styles from "./FormLinks.module.css";
import { Link } from "react-router-dom";
import { FC } from "react";

export const LoginLinks: FC = () => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className="text-base mr-2">Are you a new user?</span>
        <Link className={styles.link} to="/register">
          Sign up
        </Link>
      </div>
      <div className={styles.linkContent}>
        <Link className={styles.link} to="/forgot-password">
          Forgot Password?
        </Link>
      </div>
    </main>
  );
};

export const RegisterLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className="text-base mr-2">Already registered?</span>
        <Link className={styles.link} to="/login">
          Sign In
        </Link>
      </div>
    </main>
  );
};

export const ForgotLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <div className={styles.linkContent}>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Did you remember the password?
        </span>
        <Link className={styles.link} to="/login">
          Sign In
        </Link>
      </div>
    </main>
  );
};
