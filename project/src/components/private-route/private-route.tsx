import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { showNotify } from 'utils/utils';

type PrivateRoutePropsType = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRoutePropsType)
: JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    showNotify({type: 'warn', message: 'You are not logged in'});
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
