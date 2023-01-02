import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import treeHelper from '../utility/treeHelper';
import Node from './Node';
import './TaskView.scss';

const TaskView = ({ tree, mutations }) => {
  const id = useParams().id;
  // const {
  //   parent,
  //   currentNode: task,
  //   prevSibling,
  //   nextSibling,
  //   children
  // } = treeHelper.findFamilyByIdBFS(tree, id);
  const family = treeHelper.findFamilyByIdBFS(tree, id);
  const [rect, setRect] = useState(null);

  return (
    <div id="task-view-container">
      {family.prevSibling ? (
        <NavLink to={`/task/${family.prevSibling.id}`} className="left-arrow">
          &lt;
        </NavLink>
      ) : (
        <div className="left-arrow">&lt;</div>
      )}
      {family.parent ? (
        <NavLink to={`/task/${family.parent.id}`} className="top-arrow">
          ^
        </NavLink>
      ) : (
        <div className="top-arrow">^</div>
      )}
      {family.nextSibling ? (
        <NavLink to={`/task/${family.nextSibling.id}`} className="right-arrow">
          &gt;
        </NavLink>
      ) : (
        <div className="right-arrow">&gt;</div>
      )}
      <div id="content">
        {/* <div id="current-node">{family.currentNode.name}</div>
        <div id="children">
          {family.children.map((child) => {
            return (
              <NavLink
                to={`/task/${child.id}`}
                className="child-task"
                key={child.id}
              >
                {child.name}
              </NavLink>
            );
          })}
        </div> */}
        <div id="current-node">
          <Node
            node={family.currentNode}
            isFirst={true}
            setRect={setRect}
            delayMult={1.5}
            key={family.currentNode.id}
            mutations={mutations}
          />
        </div>
        <div id="children">
          {family.children.map((child, index) => {
            return (
              <Node
                node={child}
                isFirst={false}
                parentRect={rect}
                delayMult={0}
                key={child.id}
                mutations={mutations}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskView;
