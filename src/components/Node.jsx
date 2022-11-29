import { NavLink } from 'react-router-dom';
import './Node.scss';

const Node = (node, isGoal) => {
  if (isGoal) {
    return (
      <NavLink to={`/task/${node.id}`} className="goal-node node">
        {node.content}
      </NavLink>
    );
  }
  return (
    <NavLink to={`/task/${node.id}`} className="task-node node">
      {node.content}
    </NavLink>
  );
};

export default Node;
