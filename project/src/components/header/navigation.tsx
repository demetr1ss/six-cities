import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import UserAuth from './user-auth';
import UserNoAuth from './user-no-auth';

export default function Navigation() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isUserAuth = authorizationStatus === AuthorizationStatus.Auth;

  return isUserAuth ? <UserAuth /> : <UserNoAuth />;
}
