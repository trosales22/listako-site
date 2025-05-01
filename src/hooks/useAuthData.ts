const APP_KEY = import.meta.env.VITE_APP_KEY || 'default';

const getKey = (key: string) => `${APP_KEY}_${key}`;

export const useAuthData = () => {
  return {
    isAuthenticated: localStorage.getItem(getKey('auth_status')) === 'authenticated',
    firstname: localStorage.getItem(getKey('firstname')),
    lastname: localStorage.getItem(getKey('lastname')),
    role: localStorage.getItem(getKey('role')) || 'Unknown',
    token: localStorage.getItem(getKey('token')),
  };
};
