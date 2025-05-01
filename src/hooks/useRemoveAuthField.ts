const APP_KEY = import.meta.env.VITE_APP_KEY || 'default';
const getKey = (key: string) => `${APP_KEY}_${key}`;

export const useRemoveAuthField = () => {
  const removeAuthField = (key: string) => {
    localStorage.removeItem(getKey(key));
  };

  return { removeAuthField };
};
