import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render } from '../../../shared/test-utils';
import { RegisterPage } from '../RegisterPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockRegister = vi.fn();
vi.mock('../../../features/auth/api/authApi', () => ({
  authApi: {
    reducer: vi.fn(),
    reducerPath: 'authApi',
    middleware: vi.fn(),
  },
  useRegisterMutation: () => [
    mockRegister,
    { isLoading: false, error: null }
  ],
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockRegister.mockClear();
  });

  it('renders registration form', () => {
    render(<RegisterPage />);
    
    expect(screen.getByRole('heading', { name: 'Регистрация' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('pupkin_2215')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('........')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
  });

  it('shows validation error for short username', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);
    
    const usernameInput = screen.getByPlaceholderText('pupkin_2215');
    const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

    await user.type(usernameInput, 'short');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Логин должен содержать минимум 8 символов')).toBeInTheDocument();
    });
  });

  it('shows validation error for weak password', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);
    
    const passwordInputs = screen.getAllByPlaceholderText('........');
    const submitButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

    await user.type(passwordInputs[0], 'weakpass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Пароль должен содержать минимум 1 заглавную букву и 1 цифру')).toBeInTheDocument();
    });
  });

  it('has link to login page', () => {
    render(<RegisterPage />);
    
    const loginLink = screen.getByRole('link', { name: 'войдите' });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});