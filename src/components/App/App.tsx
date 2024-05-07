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

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<MainLayout />}>
        <Route path="/boards" element={<BoardPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
