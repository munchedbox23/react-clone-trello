import { FC } from "react";
import styles from "./ModalOverlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};
