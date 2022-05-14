import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';

export const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
