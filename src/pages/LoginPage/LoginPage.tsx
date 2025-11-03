import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/shared/hooks/redux';
import { setCredentials } from '@/features/auth/model/authSlice';
import { Sidebar } from '@/shared/ui/Sidebar';
import { ROUTES } from '@/shared/constants';
import { type LoginFormData } from '@/pages/LoginPage/types';
import './LoginPage.scss';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials({ token: result.token }));
      navigate(ROUTES.MY_TICKETS);
    } catch (err) {
    }
  };

  const getErrorMessage = () => {
    if (error && 'status' in error) {
      return 'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова.';
    }
    return null;
  };

  return (
    <div className="login-page">
      <Sidebar />
      <main className="login-page__content">
        <div className="login-form">
          <h1 className="login-form__title">Вход</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="login-form__form">
            <div className="login-form__field">
              <label className="login-form__label">Логин</label>
              <input
                {...register('username', { required: 'Введите логин' })}
                type="text"
                className={`login-form__input ${errors.username ? 'login-form__input--error' : ''}`}
                placeholder="Введите логин"
              />
              {errors.username && (
                <span className="login-form__error">{errors.username.message}</span>
              )}
            </div>

            <div className="login-form__field">
              <label className="login-form__label">Пароль</label>
              <input
                {...register('password', { required: 'Введите пароль' })}
                type="password"
                className={`login-form__input ${errors.password ? 'login-form__input--error' : ''}`}
                placeholder="Введите пароль"
              />
              {errors.password && (
                <span className="login-form__error">{errors.password.message}</span>
              )}
            </div>

            {getErrorMessage() && (
              <div className="login-form__error login-form__error--general">
                {getErrorMessage()}
              </div>
            )}

            <button 
              type="submit" 
              className="login-form__submit"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="login-form__footer">
            Если у вас нет аккаунта{' '}
            <Link to={ROUTES.REGISTER} className="login-form__link">
              зарегистрируйтесь
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
