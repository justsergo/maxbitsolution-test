import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../shared/ui/Layout';
import { MoviesPage } from '../pages/MoviesPage';
import { CinemasPage } from '../pages/CinemasPage';
import { MyTicketsPage } from '../pages/MyTicketsPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ROUTES } from '../shared/constants';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.MOVIES} replace />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="cinemas" element={<CinemasPage />} />
        <Route path="my-tickets" element={<MyTicketsPage />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Routes>
  );
};
