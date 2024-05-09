import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import {
  NotFound,
  BoardPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from "../../pages";
import { useLocation } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ROUTE } from "../../utils/constants";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/feature/user/auth";
import { useAppDispatch } from "../../services/store/hooks";
import { OnlyUnAuth, OnlyAuth } from "../WithProtectedRoute/WithProtectedRoute";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Routes location={location}>
      <Route
        path={ROUTE.home}
        element={<OnlyAuth component={<MainLayout />} />}
      >
        <Route
          path={ROUTE.mainLayout.boards}
          element={<OnlyAuth component={<BoardPage />} />}
        />
        <Route
          path={ROUTE.mainLayout.profile}
          element={<OnlyAuth component={<ProfilePage />} />}
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route
          path={ROUTE.authLayout.login}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={ROUTE.authLayout.register}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={ROUTE.authLayout.forgotPassword}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={ROUTE.authLayout.resetPassword}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
