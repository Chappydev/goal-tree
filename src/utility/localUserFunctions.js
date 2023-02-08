export const getStoredUser = () => {
  const token = JSON.parse(localStorage.getItem('authenticated-user'));
  if (!token) {
    return null;
  }
  return token;
};

export const setStoredUser = (user) => {
  localStorage.setItem('authenticated-user', JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem('authenticated-user');
};
