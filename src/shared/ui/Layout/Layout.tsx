import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/ui/Sidebar';
import './Layout.scss';

export const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};
