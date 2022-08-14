import UserAuth from './user-auth';
import UserNoAuth from './user-no-auth';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';

export default function Navigation() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? <UserAuth /> : <UserNoAuth />;
}
