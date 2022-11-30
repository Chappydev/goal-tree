import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useRect from '../hooks/useRect';
import treeHelper from '../utility/treeHelper';
import Node from './Node';
import './TaskView.scss';

const TaskView = ({ tree }) => {
  const id = useParams().id;
  // const {
  //   parent,
  //   currentNode: task,
  //   prevSibling,
  //   nextSibling,
  //   children
  // } = treeHelper.findFamilyByIdBFS(tree, id);
  const family = treeHelper.findFamilyByIdBFS(tree, id);
  const isGoal = family.parent ? false : true;
  const [currentNodeRect, currentNodeRef] = useRect();
  let childrenRects = [];
  if (family.children) {
    childrenRects = family.children.map((child) => useRect());
  }
  console.log(currentNodeRect);
  console.log(childrenRects);

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
            isGoal={isGoal}
            key={family.currentNode.id}
            ref={currentNodeRef}
          />
        </div>
        <div id="children">
          {family.children.map((child, index) => {
            const [childRect, childRef] = childrenRects[index];
            return (
              <>
                <Node
                  node={child}
                  isGoal={false}
                  key={child.id}
                  ref={childRef}
                />
                <svg className="tree-line-svg">
                  {/* 
                    TODO: change styles to taste
                    TODO: figure out animations for the styles as well 
                  */}
                  <line
                    x1={currentNodeRect.xCenter}
                    y1={currentNodeRect.yCenter}
                    x2={childRect.xCenter}
                    y2={childRect.yCenter}
                    className="tree-line"
                  />
                </svg>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskView;
