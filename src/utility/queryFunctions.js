import { getStoredUser } from './localUserFunctions';

const baseUrl = 'http://localhost:3001/api/';

const checkUsername = async (username, signal) => {
  try {
    const response = await fetch(
      baseUrl + `users/exists?username=${username}`,
      {
        signal
      }
    );

    if (!response.ok) {
      throw new Error(response.error);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const findGoal = async (id) => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  try {
    const response = await fetch(baseUrl + `goals/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    if (!response.ok) {
      throw new Error(response.error ?? '');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const createGoal = async (name) => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  const body = JSON.stringify({
    name
  });
  const response = await fetch(baseUrl + 'goals/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    },
    body
  });
  if (!response.ok) {
    throw new Error(response.error);
  }
  return await response.json();
};

const findOverview = async () => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  try {
    const response = await fetch(baseUrl + 'goalsoverview', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    if (!response.ok) {
      throw new Error(response.error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const updateNode = async (newNode) => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  const response = await fetch(baseUrl + 'nodes/' + newNode.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(newNode)
  });
  if (!response.ok) {
    throw new Error(response);
  }
  return await response.json();
};

const deleteNode = async (node) => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  const response = await fetch(baseUrl + 'nodes/' + node.id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
  if (!response.ok) {
    throw new Error(response);
  }
};

const insertNode = async (nodeName, parentId, insertInd) => {
  const user = getStoredUser();

  if (!user) {
    throw new Error({ error: 'Not currently logged in' });
  }

  const body = JSON.stringify({
    name: nodeName,
    insertInd
  });
  const response = await fetch(baseUrl + 'nodes/' + parentId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    },
    body
  });
  if (!response.ok) {
    throw new Error(response);
  }
  return await response.json();
};

export default {
  checkUsername,
  findGoal,
  createGoal,
  findOverview,
  updateNode,
  deleteNode,
  insertNode
};
