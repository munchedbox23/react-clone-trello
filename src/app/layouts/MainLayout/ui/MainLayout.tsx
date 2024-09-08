import { FC } from "react";
import { Outlet } from "react-router";
import { Preloader } from "../../../../shared/ui/Preloader/Preloader";
import { Panel } from "../../../../components/Panel/Panel";
import { Stack } from "munchedbox-ui";
import { AppHeader } from "../../../../widgets/AppHeader/AppHeader";
import { useAppSelector } from "../../../providers/StoreProvider";

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
