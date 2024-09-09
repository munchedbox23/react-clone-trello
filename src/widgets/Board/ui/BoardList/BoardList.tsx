import { FC, PropsWithChildren } from "react";
import { BoardCard } from "../../../../components/BoardCard/BoardCard";
import { IBoard } from "../../../../entities/boards/model/types/boardsTypes";
import { Text } from "munchedbox-ui";

type TBoardListProps<T> = {
  title?: string;
  subtitle?: string;
  options?: boolean;
  array: T[];
};

export const BoardList: FC<PropsWithChildren<TBoardListProps<IBoard>>> = ({
  title,
  subtitle,
  options,
  array,
  children,
}) => {
  return (
    <article className="flex flex-col mt-6">
      <header>
        <Text as="h2" size="xl" weight="medium" className="mb-2">
          {title}
        </Text>
        <Text as="p" size="sm" weight="normal" className="mb-7">
          {subtitle}
        </Text>
      </header>
      <ul className="flex items-start gap-6">
        {array &&
          array.map((item) => (
            <BoardCard data={item} hasOptions={options} key={item.id} />
          ))}
        {children}
      </ul>
    </article>
  );
};
