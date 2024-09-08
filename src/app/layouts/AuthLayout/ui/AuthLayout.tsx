import { Preloader } from "../../../../shared/ui/Preloader/Preloader";
import { useAppSelector } from "../../../providers/StoreProvider";
import Logo from "../../../../shared/assets/images/logo.png";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return (
    <section className="pt-20 flex flex-col items-center justify-center">
      <img className="w-max" src={Logo} alt="Logo trello" />
      {isRequestLoading ? <Preloader /> : <Outlet />}
    </section>
  );
};
