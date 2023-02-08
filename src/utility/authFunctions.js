import {
  clearStoredUser,
  getStoredUser,
  setStoredUser
} from './localUserFunctions';

const baseUrl = 'http://localhost:3001/api/';

const getUser = async () => {
  const storedUser = getStoredUser();

  if (!storedUser) {
    return null;
  }

  const response = await fetch(baseUrl + `users/${storedUser.id}`, {
    headers: {
      Authentication: `Bearer ${storedUser.token}`
    }
  });
  if (!response.ok) {
    throw new Error(response.body.error);
  }

  return await response.json();
};

const createUser = async (credentials) => {
  const response = await fetch(baseUrl + 'users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    throw new Error(response.body.error);
  }

  return await response.json();
};

const login = async (credentials) => {
  const response = await fetch(baseUrl + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    throw new Error(response.body.error);
  }

  return await response.json();
};

const logout = () => {
  return new Promise((resolve, reject) => resolve(clearStoredUser()));
};

export default { getUser, createUser, login, logout };
