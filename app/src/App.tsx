import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './routes/Chat';

export const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
