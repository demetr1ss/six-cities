import Logo from 'components/logo/logo';
import { PropsWithChildren } from 'react';

export default function Header({children}: PropsWithChildren): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          {children}
        </div>
      </div>
    </header>
  );
}
