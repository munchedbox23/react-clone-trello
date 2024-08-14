import { createPortal } from "react-dom";
import { FC, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Stack, Text } from "munchedbox-ui";

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
    <Stack
      align="center"
      direction="row"
      justify="center"
      className="z-20 right-0 top-0 left-0 bottom-0 fixed transition-all duration-300 ease-linear"
    >
      <Stack
        direction="row"
        justify="center"
        align="start"
        className="relative z-30 w-2/5 min-h-96 text-center rounded-3xl bg-slate-100"
      >
        {title && (
          <Text as="h2" size="2xl" weight="semibold" className="mt-5 mb-9">
            {title}
          </Text>
        )}
        <FontAwesomeIcon
          className="cursor-pointer absolute rounded-lg top-2.5 right-8 text-2xl transition-opacity duration-300 ease-linear hover:opacity-60"
          onClick={onClose}
          icon={faXmark}
        />
        <main className="h-full">{children}</main>
      </Stack>

      <div
        onClick={onClose}
        className="fixed top-0 left-0 opacity-60 w-screen h-screen z-20 bg-black"
      ></div>
    </Stack>,
    document.getElementById("modal") as HTMLElement
  );
};
