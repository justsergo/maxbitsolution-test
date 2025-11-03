import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/shared/hooks/redux';
import { setCredentials } from '@/features/auth/model/authSlice';
import { Sidebar } from '@/shared/ui/Sidebar';
import { ROUTES } from '@/shared/constants';
import type { RegisterFormData } from './types';
import './RegisterPage.scss';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await register({
        username: data.username,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ token: result.token }));
      navigate(ROUTES.MY_TICKETS);
    } catch (err) {
    }
  };

  const getErrorMessage = () => {
    if (error && 'status' in error) {
      if (error.status === 409) {
        return 'Имя пользователя уже существует';
      }
      return 'Ошибка регистрации. Попробуйте еще раз.';
    }
    return null;
  };

  return (
    <div className="register-page">
      <Sidebar />
      <main className="register-page__content">
        <div className="register-form">
          <h1 className="register-form__title">Регистрация</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="register-form__form">
            <div className="register-form__field">
              <label className="register-form__label">Логин</label>
              <input
                {...registerField('username', {
                  required: 'Введите логин',
                  minLength: {
                    value: 8,
                    message: 'Логин должен содержать минимум 8 символов'
                  }
                })}
                type="text"
                className={`register-form__input ${errors.username ? 'register-form__input--error' : ''}`}
                placeholder="pupkin_2215"
              />
              {errors.username && (
                <span className="register-form__error">{errors.username.message}</span>
              )}
            </div>

            <div className="register-form__field">
              <label className="register-form__label">Пароль</label>
              <input
                {...registerField('password', {
                  required: 'Введите пароль',
                  minLength: {
                    value: 8,
                    message: 'Пароль должен содержать минимум 8 символов'
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    message: 'Пароль должен содержать минимум 1 заглавную букву и 1 цифру'
                  }
                })}
                type="password"
                className={`register-form__input ${errors.password ? 'register-form__input--error' : ''}`}
                placeholder="........"
              />
              {errors.password && (
                <span className="register-form__error">{errors.password.message}</span>
              )}
            </div>

            <div className="register-form__field">
              <label className="register-form__label">Пароль</label>
              <input
                {...registerField('passwordConfirmation', {
                  required: 'Подтвердите пароль',
                  validate: (value) => value === password || 'Пароль не совпадает'
                })}
                type="password"
                className={`register-form__input ${errors.passwordConfirmation ? 'register-form__input--error' : ''}`}
                placeholder="........"
              />
              {errors.passwordConfirmation && (
                <span className="register-form__error">{errors.passwordConfirmation.message}</span>
              )}
            </div>

            {getErrorMessage() && (
              <div className="register-form__error register-form__error--general">
                {getErrorMessage()}
              </div>
            )}

            <button 
              type="submit" 
              className="register-form__submit"
              disabled={isLoading}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="register-form__footer">
            Если вы уже зарегистрированы{' '}
            <Link to={ROUTES.LOGIN} className="register-form__link">
              войдите
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
