import { useNavigate } from "react-router";
import { ROUTE } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../ui/Avatar/Avatar";
import { Text, Stack } from "munchedbox-ui";

export const TableHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full px-6 py-1.5 flex items-center justify-between h-11 border-slate-200 bg-header shadow-header">
      <button
        className="px-1.5 py-1 flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-300 ease-linear transition-background-color duration-500"
        onClick={() => navigate(ROUTE.home)}
      >
        <FontAwesomeIcon icon={faHouse} className="text-primary-500" />
        <Text size="base" weight="medium">
          Go home
        </Text>
      </button>
      <Stack align="center" direction="row" className="gap-1">
        <svg
          stroke="#fff"
          fill="#fff"
          strokeWidth="0"
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
        <Text as="h3" size="xl" weight="bold" className="text-white">
          Trello Clone
        </Text>
      </Stack>
      <Avatar isMini />
    </header>
  );
};
