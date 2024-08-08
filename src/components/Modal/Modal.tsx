import { createPortal } from "react-dom";
import modalStyles from "./Modal.module.css";
import { FC, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type TModalProps = {
  title?: string;
  onClose: () => void;
};

export const Modal: FC<PropsWithChildren<TModalProps>> = ({
  children,
  title,
  onClose,
}) => {
  /* WE CAN TURN 0N THE LISTENER TO CLOSE THE MODAL WHEN PRESS ESCAPE, BUT WHEN ENTERING DATA INTO THE FORM, THE LISTENER WILL BE TRIGGERED */

  // const handleCloseByEscape = useCallback(
  //   (e: KeyboardEvent) => {
  //     e.preventDefault();
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   },
  //   [onClose]
  // );

  // useEffect(() => {
  //   window.addEventListener("keydown", handleCloseByEscape);

  //   return () => {
  //     window.removeEventListener("keydown", handleCloseByEscape);
  //   };
  // }, [onClose, handleCloseByEscape]);

  return createPortal(
    <div className={modalStyles.modal}>
      <div className={`${modalStyles.modalWrapper} m`}>
        <h2 className="text-2xl font-semibold mt-5 mb-9">{title}</h2>
        <FontAwesomeIcon
          className={modalStyles.icon}
          onClick={onClose}
          icon={faXmark}
        />
        <main className="h-full">{children}</main>
      </div>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 opacity-60 w-screen h-screen z-20 bg-black"
      ></div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};
