import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { App } from './App';
import * as React from 'react';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--2cpvhzk.us.auth0.com"
      clientId="Gl0v1ofUERQ7yXBa1Zwghot8tOcktJMX"
      redirectUri={window.location.origin}
    >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
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
