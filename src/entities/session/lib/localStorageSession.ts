const TOKEN_KEY = 'jwt-token';
const VIEWER_DATA = 'session';

const setToken = (accessToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeSessionData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(VIEWER_DATA);
};

export const localStorageViewer = {
  setToken,
  getToken,
  removeSessionData,
};
