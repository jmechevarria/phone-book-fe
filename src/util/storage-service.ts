const TOKEN_KEY = "TOKEN";
const USER_KEY = "USER";

export const persistToken = (tokenString: string) => {
  localStorage.setItem(TOKEN_KEY, tokenString);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearStorage = () => {
  localStorage.clear();
};
