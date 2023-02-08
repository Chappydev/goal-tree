const baseUrl = 'http://localhost:3001/api/';

// TODO: change so you can choose which goal to fetch
const findGoal = async (id) => {
  const response = await fetch(baseUrl + `goals/${id}`);
  if (!response.ok) {
    throw new Error(response.body.error ?? '');
  }
  return await response.json();
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

// TODO: change so overview gives you data about ALL goals by default
const findOverview = async () => {
  const response = await fetch(baseUrl + 'goals-overview');
  if (!response.ok) {
    throw new Error(response);
  }
  return await response.json();
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
