import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';

type PrivateRoutePropsType = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRoutePropsType)
: JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
