import { createBrowserRouter } from "react-router-dom";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { ROUTE } from "../../../../shared/helpers/constants";
import { AuthLayout } from "../../../layouts/AuthLayout";
import { MainLayout } from "../../../layouts/MainLayout";
import {
  BoardPage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  TablePage,
  NotFound,
} from "../../../../pages";

export const router = createBrowserRouter([
  {
    path: ROUTE.home,
    element: <OnlyAuth component={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <OnlyAuth component={<BoardPage />} />,
      },
      {
        path: ROUTE.mainLayout.profile,
        element: <OnlyAuth component={<ProfilePage />} />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTE.authLayout.login,
        element: <OnlyUnAuth component={<LoginPage />} />,
      },
      {
        path: ROUTE.authLayout.register,
        element: <OnlyUnAuth component={<RegisterPage />} />,
      },
      {
        path: ROUTE.authLayout.forgotPassword,
        element: <OnlyUnAuth component={<ForgotPasswordPage />} />,
      },
      {
        path: ROUTE.authLayout.resetPassword,
        element: <OnlyUnAuth component={<ResetPasswordPage />} />,
      },
    ],
  },
  {
    path: `/${ROUTE.table}`,
    element: <OnlyAuth component={<TablePage />} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
