import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render } from '../../../shared/test-utils';
import { LoginPage } from '../LoginPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLogin = vi.fn();
vi.mock('../../../features/auth/api/authApi', () => ({
  authApi: {
    reducer: vi.fn(),
    reducerPath: 'authApi',
    middleware: vi.fn(),
  },
  useLoginMutation: () => [
    mockLogin,
    { isLoading: false, error: null }
  ],
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockClear();
  });

  it('renders login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: 'Вход' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите логин')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: 'Войти' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Введите логин')).toBeInTheDocument();
      expect(screen.getByText('Введите пароль')).toBeInTheDocument();
    });
  });

  it('has link to registration page', () => {
    render(<LoginPage />);
    
    const registerLink = screen.getByRole('link', { name: 'зарегистрируйтесь' });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});