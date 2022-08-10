import UserAuth from './user-auth';
import UserNoAuth from './user-no-auth';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';

export default function Navigation() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isUserAuth = authorizationStatus === AuthorizationStatus.Auth;

  return isUserAuth ? <UserAuth /> : <UserNoAuth />;
}
