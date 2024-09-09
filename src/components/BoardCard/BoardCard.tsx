import { FC, useEffect, useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faTrash,
  faPenToSquare,
  faTimes,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { IBoard } from "../../entities/boards/model/types/boardsTypes";
import {
  deleteBoard,
  updateBoard,
} from "../../entities/boards/model/slice/boardsSlice";
import { useNavigate } from "react-router-dom";
import { MStack, Text } from "munchedbox-ui";
import { useAppDispatch } from "../../app/providers/StoreProvider";
import { useForm } from "../../shared/hooks/useForm";

type TBoardCardProps = {
  hasOptions?: boolean;
  data: IBoard;
};

export const BoardCard: FC<TBoardCardProps> = ({ hasOptions, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { formState, onChange, setFormState } = useForm({
    name: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormState({ name: data.name });
    }
  }, [setFormState, data]);

  const handleOpenMenu = (e: MouseEvent<SVGSVGElement>): void => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    dispatch(deleteBoard(id));
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsVisible(false);
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(updateBoard({ ...data, name: formState.name }));
    setIsEditing(false);
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFormState({ ...formState, name: data.name });
    setIsEditing(false);
  };

  return (
    <MStack
      style={{ backgroundImage: `url(${data.background.small}` }}
      className="p-4 w-72 min-h-32 bg-center bg-no-repeat bg-cover rounded-2xl cursor-pointer font-base font-medium relative border-1 border-solid border-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      justify="center"
      align="start"
      direction="column"
      onClick={() => navigate(`/boards/${data.id}`)}
    >
      {hasOptions && (
        <FontAwesomeIcon
          icon={faEllipsis}
          className="absolute top-1.5 text-xl right-2.5 z-0 text-primary-500 transition-colors duration-300 ease-in hover:text-white"
          onClick={handleOpenMenu}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="h-4/5 px-4 pt-1 absolute w-full z-40 bottom-0 left-0 flex flex-col bg-transparent gap-2"
            initial={{ opacity: 0, clipPath: "circle(0.4% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(141.2% at 100% 0)" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, clipPath: "circle(0.4% at 100% 0)" }}
          >
            <button
              onClick={(e) => handleDelete(e, data.id)}
              className="w-full h-10 flex items-center justify-between rounded gap-12 px-2 bg-gray-200 transition-background-color duration-500 ease-in-out hover:bg-neutral-200"
            >
              <Text align="left">Delete</Text>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#ff0000" }} />
            </button>
            <button
              className="w-full h-10 flex items-center justify-between rounded gap-12 px-2 bg-gray-200 transition-background-color duration-500 ease-in-out hover:bg-neutral-200"
              onClick={handleUpdate}
            >
              <Text align="left">Edit</Text>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#477eff" }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {isEditing ? (
        <MStack spacing="sm" direction="row">
          <input
            type="text"
            value={formState.name}
            onChange={onChange}
            name="name"
            className="w-3/5 outline-none px-1 pl-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 rounded-lg mr-1"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-2 py-1 rounded-lg"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </MStack>
      ) : (
        <Text as="h4" size="lg" className="mb-3 text-sky-950" weight="medium">
          {data.name}
        </Text>
      )}
    </MStack>
  );
};
