import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { LIMIT_IMAGE } from 'const/const';
import { offers } from 'mock/offers';
import { reviews } from 'mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offers = {offers}
      limit = {LIMIT_IMAGE}
      reviews = {reviews}
    />
  </React.StrictMode>,
);
