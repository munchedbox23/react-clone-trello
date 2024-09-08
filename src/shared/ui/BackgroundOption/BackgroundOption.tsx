import { FC } from "react";
import optionStyles from "./BackgroundOption.module.css";
import cn from "classnames";

type TBackgroundOptionProps = {
  imageSrc: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

export const BackgroundOption: FC<TBackgroundOptionProps> = ({
  imageSrc,
  name,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={cn(optionStyles.backgroundgOption, {
        [optionStyles.selectedOption]: isSelected,
      })}
      onClick={onClick}
    >
      <img className={optionStyles.image} src={imageSrc} alt={name} />
    </div>
  );
};
