import { ChangeEvent, FC, useState } from "react";
import headerStyles from "./AppHeader.module.css";
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/appStore";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import { selectBoardsByUser } from "../../services/feature/boards/boardSelectors";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { filteredBoardsByName } from "../../services/feature/boards/boardsSlice";

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
    <header className={`${headerStyles.header} p-6`}>
      <img src={Logo} alt="Trello Logo" />
      <form className={headerStyles.headerForm}>
        <div className={headerStyles.formWrapper}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={headerStyles.formIcon}
          />
          <input
            className={headerStyles.input}
            type="text"
            name="search"
            placeholder="Search board"
            onChange={handleSearchChange}
            maxLength={500}
            value={searchParams.get("search") || ""}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleClearSearch}
          />
        </div>
        <AnimatePresence mode="wait">
          {showDropdown && (
            <motion.div
              className={`${headerStyles.dropdown} text-center mt-2 py-2 px-3`}
              initial={{ height: 0 }}
              animate={{ height: "200px" }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: showDropdown ? 0 : 0.5 }}
            >
              {userBoards.length > 0 ? (
                userBoards.map((board) => (
                  <Link
                    to={`/boards/${board.id}`}
                    key={board.id}
                    className={headerStyles.dropdownItem}
                  >
                    <img
                      src={board.background.small}
                      alt={`Background for ${board.name}`}
                    />
                    <h5 className="text-base font-medium">{board.name}</h5>
                  </Link>
                ))
              ) : (
                <strong className="text-base">
                  You don't have any active boards
                </strong>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      <div className={headerStyles.btnsContainer}>
        <button
          onClick={() => handleModalOpen("create-board")}
          className={`${headerStyles.navLink} pt-2 pr-4 pb-2 pl-4`}
          disabled={!(location.pathname === "/")}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Create</span>
        </button>
      </div>
    </header>
  );
};
