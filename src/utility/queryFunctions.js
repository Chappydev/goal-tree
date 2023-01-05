const baseUrl = 'http://localhost:3001/api/';

const findGoal = async () => {
  const response = await fetch(baseUrl + 'goals/0/');
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
  return response.json();
};

export default { findGoal, updateNode };
