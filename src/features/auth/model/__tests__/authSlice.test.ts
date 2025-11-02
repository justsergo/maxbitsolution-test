import { authSlice, setCredentials, logout } from '../authSlice';
import type { AuthState } from '../../types';

describe('authSlice', () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
  };

  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCredentials', () => {
    const token = 'test-token';
    const user = { id: 1, username: 'testuser' };

    const actual = authSlice.reducer(
      initialState,
      setCredentials({ token, user })
    );

    expect(actual.isAuthenticated).toBe(true);
    expect(actual.token).toBe(token);
    expect(actual.user).toEqual(user);
    expect(sessionStorage.getItem('token')).toBe(token);
  });

  it('should handle setCredentials without user', () => {
    const token = 'test-token';

    const actual = authSlice.reducer(
      initialState,
      setCredentials({ token })
    );

    expect(actual.isAuthenticated).toBe(true);
    expect(actual.token).toBe(token);
    expect(actual.user).toBe(null);
  });

  it('should handle logout', () => {
    const authenticatedState: AuthState = {
      isAuthenticated: true,
      token: 'test-token',
      user: { id: 1, username: 'testuser' },
    };

    sessionStorage.setItem('token', 'test-token');

    const actual = authSlice.reducer(authenticatedState, logout());

    expect(actual.isAuthenticated).toBe(false);
    expect(actual.token).toBe(null);
    expect(actual.user).toBe(null);
    expect(sessionStorage.getItem('token')).toBe(null);
  });
});
