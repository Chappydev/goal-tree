import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useModal from '../hooks/useModal';
import treeHelper from '../utility/treeHelper';
import EditForm from './EditForm';
import Modal from './Modal';
import NewNodeForm from './NewNodeForm';
import Node from './Node';
import './TaskView.scss';

const TaskView = ({ tree, mutations }) => {
  const id = useParams().id;
  const family = treeHelper.findFamilyByIdBFS(tree, id);
  const [rect, setRect] = useState(null);
  const [editIsShown, editFormNode, editHandleOpen, editHandleClose] =
    useModal();
  const [addIsShown, addFormNode, addHandleOpen, addHandleClose] = useModal();

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
            editHandleOpen={editHandleOpen}
            addHandleOpen={addHandleOpen}
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
                editHandleOpen={editHandleOpen}
                addHandleOpen={addHandleOpen}
                key={child.id}
                mutations={mutations}
              />
            );
          })}
        </div>
      </div>
      <Modal handleClose={editHandleClose} isShown={editIsShown}>
        <EditForm node={editFormNode} handleClose={editHandleClose} />
      </Modal>
      <Modal handleClose={addHandleClose} isShown={addIsShown}>
        <NewNodeForm node={addFormNode} handleClose={addHandleClose} />
      </Modal>
    </div>
  );
};

export default TaskView;
