const baseUrl = 'http://localhost:3000/';

const findGoal = async () => {
  const response = await fetch(baseUrl + 'goals/');
  if (!response.ok) {
    throw new Error(response);
  }
  return response.json();
};

export default { findGoal };
