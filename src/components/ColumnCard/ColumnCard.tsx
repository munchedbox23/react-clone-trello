import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { setSelectedTask } from "../../services/feature/boards/boardsSlice";
import { ITask } from "../../app/types/boardsTypes";
import { Stack, Text } from "munchedbox-ui";
import { useAppDispatch } from "../../app/providers/StoreProvider";

type TColumnCard = {
  task: ITask;
  boardId: string;
  columnId: string;
};

export const ColumnCard: FC<TColumnCard> = ({ task, boardId, columnId }) => {
  const dispatch = useAppDispatch();

  return (
    <li
      data-testid="list-card"
      className="flex flex-col gap-2 scroll-m-20"
      onClick={() => {
        dispatch(setSelectedTask({ task, boardId, columnId }));
        dispatch(setModalOpen());
      }}
    >
      <Stack
        data-testid="trello-card"
        direction="row"
        justify="between"
        align="center"
        className="relative min-h-9 bg-white rounded-lg cursor-pointer z-10 pt-1 pr-1 pb-1 pl-2 scroll-m-2 text-blue-950 shadow-trello-card hover:opacity-100 hover:outline-2 group"
      >
        <Text as="p" size="base" weight="normal" align="left">
          {task.title}
        </Text>
        <FontAwesomeIcon
          className="w-4 p-1 h-4 rounded text-blue-950 transition-all duration-200 ease-in-out hover:bg-slate-300 group-hover:block hidden"
          icon={faHighlighter}
        />
      </Stack>
    </li>
  );
};
