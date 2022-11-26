import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import treeHelper from '../utility/treeHelper';
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

  // const relativeParent = {
  //   position: 'relative',
  //   height: '100%',
  //   width: '100%'
  // };

  // const absoluteLeft = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   left: '0.5em',
  //   top: '50%',
  //   transform: 'translateX(-50%)',
  //   height: '3em',
  //   width: '1em'
  // };

  // const absoluteRight = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   right: '0px',
  //   top: '50%',
  //   transform: 'translateY(-50%)',
  //   height: '3em',
  //   width: '1em'
  // };

  // const absoluteTop = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   top: '0.5em',
  //   left: '50%',
  //   transform: 'translateY(-50%)',
  //   width: '3em',
  //   height: '1em'
  // };

  return (
    <div id="task-view-container">
      {/* TODO: fix link when there is no parent/sibling/whatever */}
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
      <div id="content">{family.currentNode.name}</div>
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
      </div>
    </div>
  );
};

export default TaskView;
