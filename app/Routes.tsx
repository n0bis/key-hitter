/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpack
const LazyKeyboardIOHookPage = React.lazy(() =>
  import(
    /* webpackChunkName: "KeyboardIOHookPage" */ './containers/KeyboardIOHookPage'
  )
);

const LazyKeyboardHIDPage = React.lazy(() =>
  import(
    /* webpackChunkName: "KeyboardHIDPage" */ './containers/KeyboardHIDPage'
  )
);

const KeyboardIOHookPage = (props: Record<string, unknown>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyKeyboardIOHookPage {...props} />
  </React.Suspense>
);

const KeyboardHIDPage = (props: Record<string, unknown>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyKeyboardHIDPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.KEYBOARDIOHOOK} component={KeyboardIOHookPage} />
        <Route path={routes.KEYBOARDHID} component={KeyboardHIDPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
