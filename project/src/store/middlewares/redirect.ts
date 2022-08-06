import browserHistory from 'components/browser-history';
import { Middleware } from 'redux';
import { reducer } from 'store/reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'login/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };