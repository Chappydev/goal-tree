import treeHelper from './treeHelper';

const baseUrl = 'http://localhost:3000/';

const findGoal = async () => {
  const goalResponse = await fetch(baseUrl + 'goals/0/');
  if (!goalResponse.ok) {
    throw new Error(goalResponse);
  }
  const goalData = await goalResponse.json();
  const nodesResponse = await fetch(baseUrl + 'nodes/');
  if (!nodesResponse.ok) {
    throw new Error(nodesResponse);
  }
  const nodesData = await nodesResponse.json();
  const data = { ...goalData, nodes: [...nodesData] };
  return treeHelper.buildTree(data);
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
