import Logo from "../../assets/images/logo.png";
import { Outlet } from "react-router";
import { Preloader } from "../../ui/Preloader/Preloader";
import { useAppSelector } from "../../app/appStore";

export const AuthLayout = () => {
  const isRequestLoading = useAppSelector(
    (store) => store.user.isRequestLoading
  );
  return (
    <section className="pt-20 flex flex-col items-center justify-center">
      <img src={Logo} alt="Logo trello" />
      {isRequestLoading ? <Preloader /> : <Outlet />}
    </section>
  );
};
