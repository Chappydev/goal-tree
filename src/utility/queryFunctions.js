import { getStoredUser } from './localUserFunctions';

const baseUrl = 'http://localhost:3001/api/';

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
  const body = JSON.stringify({
    name
  });
  const response = await fetch(baseUrl + 'goals/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  const response = await fetch(baseUrl + 'nodes/' + newNode.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNode)
  });
  if (!response.ok) {
    throw new Error(response);
  }
  return await response.json();
};

const deleteNode = async (node) => {
  const response = await fetch(baseUrl + 'nodes/' + node.id, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(response);
  }
};

const insertNode = async (nodeName, parentId, insertInd) => {
  const body = JSON.stringify({
    name: nodeName,
    insertInd
  });
  const response = await fetch(baseUrl + 'nodes/' + parentId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  if (!response.ok) {
    throw new Error(response);
  }
  return await response.json();
};

export default {
  findGoal,
  createGoal,
  findOverview,
  updateNode,
  deleteNode,
  insertNode
};
