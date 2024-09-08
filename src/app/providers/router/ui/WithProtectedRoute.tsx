import { Navigate, useLocation } from "react-router";
import { FC, ReactElement } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { ROUTE } from "../../../../shared/helpers/constants";
import { RootState, useAppSelector } from "../../StoreProvider";

type IWithProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const WithProtectedRoute: FC<IWithProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const selectUser = (state: RootState) => state.user;
  const selectUserInfo = createSelector(selectUser, (user) => ({
    user: user.user,
    isAuthChecked: user.isAuthChecked,
  }));
  const { user, isAuthChecked } = useAppSelector(selectUserInfo);
  const location = useLocation();

  if (!isAuthChecked) return null;

  if (user && onlyUnAuth) {
    const { from } = location.state || { from: { pathname: ROUTE.home } };
    return <Navigate to={from} replace />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={ROUTE.authLayout.login} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = WithProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => {
  return <WithProtectedRoute onlyUnAuth={true} component={component} />;
};
