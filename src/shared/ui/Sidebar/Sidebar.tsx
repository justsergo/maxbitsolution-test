import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/redux';
import { logout } from '@/features/auth/model/authSlice';
import { ROUTES } from '@/shared/constants';
import './Sidebar.scss';

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.MOVIES);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink 
          to={ROUTES.MOVIES} 
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Фильмы
        </NavLink>
        <NavLink 
          to={ROUTES.CINEMAS} 
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Кинотеатры
        </NavLink>
        <NavLink 
          to={ROUTES.MY_TICKETS} 
          className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
        >
          Мои билеты
        </NavLink>
        
        {isAuthenticated ? (
          <button 
            className="sidebar__link sidebar__link--button" 
            onClick={handleLogout}
          >
            Выход
          </button>
        ) : (
          <NavLink 
            to={ROUTES.LOGIN} 
            className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
          >
            Вход
          </NavLink>
        )}
      </nav>
    </aside>
  );
};
