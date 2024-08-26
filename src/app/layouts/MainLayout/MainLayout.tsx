import { FC } from "react";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { Outlet } from "react-router";
import { Preloader } from "../../../ui/Preloader/Preloader";
import { Panel } from "../../../components/Panel/Panel";
import { useAppSelector } from "../../appStore";
import { Stack } from "munchedbox-ui";

export const MainLayout: FC = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return isRequestLoading ? (
    <div className="w-screen h-screen flex justify-center relative">
      <Preloader />
    </div>
  ) : (
    <>
      <AppHeader />
      <Stack
        direction="row"
        align="start"
        spacing="lg"
        className="max-h-custom"
      >
        <Panel />
        <main className="flex-1 w-10/12 overflow-hidden">
          <Outlet />
        </main>
      </Stack>
    </>
  );
};
