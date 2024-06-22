import { useNavigate } from "react-router";
import tableStyles from "./TableHeader.module.css";
import { ROUTE } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../ui/Avatar/Avatar";

export const TableHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={`${tableStyles.header} px-6 py-1.5`}>
      <button className={tableStyles.btn} onClick={() => navigate(ROUTE.home)}>
        <FontAwesomeIcon icon={faHouse} />
        <span className="text-base font-medium">Go home</span>
      </button>
      <div className={tableStyles.headerLogo}>
        <svg
          stroke="#fff"
          fill="#fff"
          stroke-width="0"
          role="img"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          <title></title>
          <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .794-.645 1.44-1.44 1.44H15c-.795 0-1.44-.646-1.44-1.44V4.56c0-.795.646-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z"></path>
        </svg>
        <h3 className="text-xl text-white font-bold">Trello Clone</h3>
      </div>
      <Avatar isMini />
    </header>
  );
};
