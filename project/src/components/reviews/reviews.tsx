import Form from './form/form';
import ReviewsList from './reviews-list/reviews-list';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';

export default function Review() {
  const userAuthStatus = useAppSelector((state) => state.authorizationStatus);
  const isUserAuth = userAuthStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <ReviewsList />
      {isUserAuth && <Form />}
    </section>
  );
}
