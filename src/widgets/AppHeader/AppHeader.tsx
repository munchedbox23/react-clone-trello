import { ChangeEvent, FC, useState } from "react";
import Logo from "../../shared/assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectBoardsByUser } from "../../services/feature/boards/boardSelectors";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { filteredBoardsByName } from "../../services/feature/boards/boardsSlice";
import { IBoard } from "../../app/types/boardsTypes";
import { Button, MStack, Text } from "munchedbox-ui";
import { useAppDispatch, useAppSelector } from "../../app/providers/StoreProvider";

export const AppHeader: FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const userBoards = useAppSelector(selectBoardsByUser);

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchParams({ ...searchParams, [e.target.name]: searchTerm });
    dispatch(filteredBoardsByName(searchTerm));
  };

  const handleClearSearch = (): void => {
    setSearchParams({ ...searchParams, search: "" });
    setShowDropdown(false);
    dispatch(filteredBoardsByName(""));
  };

  return (
    <header className="flex items-center justify-between w-full relative top-0 left-0 z-10 h-20 bg-neutral-100 shadow-custom-header p-6">
      <img src={Logo} alt="Trello Logo" />
      <form className="flex relative flex-col items-center">
        <MStack
          align="center"
          direction="row"
          justify="between"
          spacing="sm"
          className="relative h-8 rounded-2xl max-w-lg w-full border-2 focus-within:border-primary-500 border-opacity-16"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute w-4 h-4 top-1.7 left-2 text-blue-950	"
          />
          <input
            className="h-full outline-none pr-3 pl-7 w-52 rounded-2xl focus:w-96 bg-stone-50 transition-width duration-700 ease-linear text-sky-800"
            type="text"
            name="search"
            placeholder="Search board"
            onChange={handleSearchChange}
            maxLength={500}
            value={searchParams.get("search") || ""}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleClearSearch}
            autoComplete="off"
          />
        </MStack>
        <AnimatePresence mode="wait">
          {showDropdown && (
            <MStack
              spacing="sm"
              className="text-center mt-2 py-2 px-3 w-full absolute top-full max-h-52 overflow-y-auto left-0 bg-white rounded-lg border border-solid "
              initial={{ height: 0 }}
              animate={{ height: "200px" }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: showDropdown ? 0 : 0.5 }}
            >
              {userBoards.length > 0 ? (
                userBoards.map((board: IBoard) => (
                  <Link
                    to={`/boards/${board.id}`}
                    key={board.id}
                    className="p-4 bg-slate-200 rounded-md color-primary-500 h-12 flex items-center gap-4 hover:bg-gray-300"
                  >
                    <img
                      src={board.background.small}
                      alt={`Background for ${board.name}`}
                      className="rounded-md w-9 h-9"
                    />
                    <Text as="h2" size="base" weight="medium" align="left">
                      {board.name}
                    </Text>
                  </Link>
                ))
              ) : (
                <Text as="strong" align="center" size="base">
                  You don't have any active boards
                </Text>
              )}
            </MStack>
          )}
        </AnimatePresence>
      </form>
      <Button
        type="button"
        variant="primary"
        size="sm"
        disabled={!(location.pathname === "/")}
        onClick={() => handleModalOpen("create-board")}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        <Text>Create</Text>
      </Button>
    </header>
  );
};
