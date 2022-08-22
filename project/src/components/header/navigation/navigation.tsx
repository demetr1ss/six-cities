import UserAuth from '../user-auth/user-auth';
import UserNoAuth from '../user-no-auth/user-no-auth';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';
import { memo } from 'react';

function Navigation() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? <UserAuth /> : <UserNoAuth />;
}

export default memo(Navigation);
