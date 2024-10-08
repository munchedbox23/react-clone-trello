import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FC, memo } from "react";
import { Text, Stack } from "munchedbox-ui";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/providers/StoreProvider";
import { userLogout } from "../../../../entities/user/api/userApi";
import { ROUTE, panelLinks } from "../../../../shared/helpers/constants";
import { PanelLink } from "../PanelLink/PanelLink";
import { Avatar } from "../../../../shared/ui/Avatar/ui/Avatar";

export const Panel: FC = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.user.user);

  const handleLogout = () => {
    dispatch(userLogout())
      .then(() => navigate(ROUTE.authLayout.login, { replace: true }))
      .catch((error) => console.error(error));
  };

  return (
    <nav
      className={`flex flex-col items-center bg-zinc-100 shadow-custom gap-8 pt-6 pl-3 pr-3 flex-0 w-2/12 h-custom`}
    >
      <Avatar>
        <Text as="h4" size="lg" weight="medium" className="mt-3" align="center">
          {user?.name}
        </Text>
        <Text as="small" size="sm">
          {user?.email}
        </Text>
      </Avatar>
      <ul className="flex flex-col gap-5 w-full">
        {panelLinks.map((link) => (
          <PanelLink
            key={link.id}
            route={link.route}
            text={link.name}
            icon={link.icon}
          />
        ))}
      </ul>
      <Stack
        spacing="sm"
        align="center"
        direction="row"
        justify="start"
        onClick={handleLogout}
        className="absolute cursor-pointer bottom-8 rounded-2xl p-3 bg-zinc-300 duration-300 ease-in hover:opacity-85"
      >
        <Text as="span" size="lg" weight="medium">
          Logout
        </Text>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </Stack>
    </nav>
  );
});
