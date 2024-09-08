import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import { EditableTitle } from "../../shared/ui/EditableTitle/EditableTitle";
import { FC } from "react";
import { Stack, Text } from "munchedbox-ui";
import { useAppSelector } from "../../app/providers/StoreProvider";

type TTaskDetailsProps = {
  onUpdateTaskName: (
    boardId: string,
    columnId: string,
    taskId: string,
    newName: string
  ) => void;
};

export const TaskDetails: FC<TTaskDetailsProps> = ({ onUpdateTaskName }) => {
  const selectedTask = useAppSelector((store) => store.boards.selectedTask);

  if (!selectedTask) return null;

  const { task, boardId, columnId } = selectedTask;

  return (
    <Stack direction="column" justify="start" align="start" className="w-96">
      <header className="min-h-8 relative flex items-center gap-3 w-full pt-2 pr-12 pb-2 pl-14">
        <FontAwesomeIcon icon={faWindowMaximize} />
        <div className="w-full">
          <EditableTitle
            inputName="cardName"
            initialValue={task.title}
            updateName={(newName) =>
              onUpdateTaskName(boardId, columnId, task.id, newName)
            }
          />
        </div>
      </header>
      <div className="mt-8 pl-14 items-start">
        <Stack align="center" spacing="sm" direction="row">
          <FontAwesomeIcon icon={faBarsStaggered} />
          <Text as="h3" size="base" weight="bold">
            Description
          </Text>
        </Stack>
      </div>
    </Stack>
  );
};
