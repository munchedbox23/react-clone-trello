import styles from "./Avatar.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../services/store/hooks";
import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { ROUTE } from "../../utils/constants";

export const Avatar: FC<PropsWithChildren<{ isMini?: boolean }>> = ({
  children,
  isMini,
}) => {
  const user = useAppSelector((store) => store.user.user);

  const userName = user?.name
    .split(" ")
    .reduce((acc, word) => (acc += word.at(0)!.toUpperCase()), "");

  return (
    <div className={styles.profileInfo}>
      <Link
        to={`/${ROUTE.mainLayout.profile}`}
        className={`${cn(styles.profileLink, {
          [styles.mini]: isMini,
        })} ${!isMini && "pt-2 pr-4 pb-2 pl-4"}`}
      >
        <span
          className={`${cn(styles.profileText, {
            [styles.textBase]: isMini,
          })} text-center`}
        >
          {userName}
        </span>
      </Link>
      {children}
    </div>
  );
};
