import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import {
  NotFound,
  BoardPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../../pages";
import { useLocation } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ROUTE } from "../../utils/constants";

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path={ROUTE.home} element={<MainLayout />}>
        <Route path={ROUTE.mainLayout.boards} element={<BoardPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path={ROUTE.authLayout.login} element={<LoginPage />} />
        <Route path={ROUTE.authLayout.register} element={<RegisterPage />} />
        <Route
          path={ROUTE.authLayout.forgotPassword}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ROUTE.authLayout.resetPassword}
          element={<ResetPasswordPage />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
