const baseUrl = 'http://localhost:3001/api/';

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('authenticated-user'));
  if (!token) {
    return null;
  }
  return token;
};

const setToken = (token) => {
  localStorage.setItem('authenticated-user', JSON.stringify(token));
};

const clearToken = () => {
  localStorage.removeItem('authenticated-user');
};

const getUser = async (id) => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(baseUrl + `users/${id}`, {
    headers: {
      Authentication: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(response.body);
  }

  return await response.json();
};

const createUser = async (credentials) => {
  const response = await fetch(baseUrl + 'users', {
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    throw new Error(response.body);
  }

  login(credentials);

  return await response.json();
};

const login = async (credentials) => {
  const response = await fetch(baseUrl + 'login', {
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    throw new Error(response.body);
  }

  const token = await response.json();

  if (token) {
    setToken(token);
  }

  return token;
};

const logout = async () => {
  clearToken();
};

export default { getUser, createUser, login, logout };
