const APP_KEY = import.meta.env.VITE_APP_KEY || "default";

const setKey = (key: string) => `${APP_KEY}_${key}`;

export const useSetAuthField = () => {
  const setAuthField = (key: string, value: string) => {
    localStorage.setItem(setKey(key), value);
  };

  return { setAuthField };
};
