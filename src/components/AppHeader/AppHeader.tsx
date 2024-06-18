import { ChangeEvent, FC } from "react";
import headerStyles from "./AppHeader.module.css";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../services/store/hooks";
import { setModalOpen } from "../../services/feature/modal/modalSlice";
import { useSearchParams } from "react-router-dom";
import { filterBoards } from "../../services/feature/board/boardSlice";

export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleModalOpen = (content?: string): void => {
    dispatch(setModalOpen(content));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value });
    dispatch(filterBoards(e.target.value));
  };

  return (
    <header className={`${headerStyles.header} p-6`}>
      <img src={Logo} alt="Trello Logo" />
      <form>
        <div className={headerStyles.formWrapper}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={headerStyles.formIcon}
          />
          <input
            className={headerStyles.input}
            type="text"
            placeholder="Search board"
            maxLength={500}
            onChange={handleSearch}
            value={searchParams.get("search") || ""}
          />
        </div>
      </form>
      <div className={headerStyles.btnsContainer}>
        <button
          onClick={() => handleModalOpen("create-board")}
          className={`${headerStyles.navLink} pt-2 pr-4 pb-2 pl-4`}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Create</span>
        </button>
      </div>
    </header>
  );
};
