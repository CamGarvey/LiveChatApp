import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';

import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Chat from './routes/Chat';
import { App } from './App';
import ProtectedRoute from './components/ProtectedRoute';
import AuthorizedApolloProvider from './components/AuthorizedApolloProvider';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev--2cpvhzk.us.auth0.com"
      clientId="ykjYHTAgBdTmwJmSgOkL7UTOlQqKCJdR"
      redirectUri={'http://localhost:3000'}
      audience="https://dev--2cpvhzk.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <AuthorizedApolloProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  path="/chat"
                  element={<ProtectedRoute component={Chat} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
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
