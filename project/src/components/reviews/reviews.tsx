import Form from './form/form';
import ReviewsList from './reviews-list/reviews-list';
import { AuthorizationStatus } from 'const/const';
import { useAppSelector } from 'hooks';
import { getAuthorizationStatus } from 'store/user-process/selectors';

export default function Review() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isUserAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <ReviewsList />
      {isUserAuth && <Form />}
    </section>
  );
}
