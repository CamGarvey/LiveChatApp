import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import AuthorizedApolloProvider from './components/Providers/AuthorizedApolloProvider';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={'http://localhost:3000/chat'}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="read:current_user update:current_user_metadata read:current_user_metadata email"
    >
      <AuthorizedApolloProvider>
        <App />
      </AuthorizedApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
