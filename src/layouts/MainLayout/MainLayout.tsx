import { FC } from "react";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Preloader } from "../../ui/Preloader/Preloader";
import { Panel } from "../../components/Panel/Panel";
import { useAppSelector } from "../../app/appStore";
import { Stack } from "munchedbox-ui";

export const MainLayout: FC = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return isRequestLoading ? (
    <Preloader />
  ) : (
    <>
      <AppHeader />
      <Stack direction="row" align="start" spacing="lg">
        <Panel />
        <main className="flex-1 w-10/12">
          <Outlet />
        </main>
      </Stack>
    </>
  );
};
