import Logo from 'components/logo/logo';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import HeaderUserAuth from './header-user-auth';
import HeaderUserNoAuth from './header-user-no-auth';

export default function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isUserAuth = authorizationStatus === AuthorizationStatus.Auth;


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isUserAuth ? <HeaderUserAuth /> : <HeaderUserNoAuth />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
