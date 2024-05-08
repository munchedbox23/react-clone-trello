import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../services/store/hooks";
import { FC, ReactElement } from "react";
import { ROUTE } from "../../utils/constants";

type IWithProtectedRouteProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

export const WithProtectedRoute: FC<IWithProtectedRouteProps> = ({
  component,
  onlyUnAuth = false,
}) => {
  const user = useAppSelector((store) => store.user.user);
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
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
