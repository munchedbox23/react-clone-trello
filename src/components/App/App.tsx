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
  TablePage,
} from "../../pages";
import { useLocation } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { ROUTE } from "../../utils/constants";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/feature/user/auth";
import { useAppDispatch } from "../../services/store/hooks";
import { OnlyUnAuth, OnlyAuth } from "../WithProtectedRoute/WithProtectedRoute";
import {
  getBoards,
  getColumns,
  getTemplates,
} from "../../services/feature/board/boardSlice";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getColumns());
    dispatch(getTemplates());
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <Routes key={location?.pathname} location={location}>
        <Route
          path={ROUTE.home}
          element={<OnlyAuth component={<MainLayout />} />}
        >
          <Route index element={<OnlyAuth component={<BoardPage />} />} />
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
        <Route
          path={`/${ROUTE.table}`}
          element={<OnlyAuth component={<TablePage />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
