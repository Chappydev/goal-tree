import { atom } from 'jotai';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { NavLink, useParams } from 'react-router-dom';
import useModal from '../hooks/useModal';
import treeHelper from '../utility/treeHelper';
import EditForm from './EditForm';
import Modal from './Modal';
import NewNodeForm from './NewNodeForm';
import Node from './Node';
import './TaskView.scss';

export const editIsShownAtom = atom(false);
export const addIsShownAtom = atom(false);
export const editNodeAtom = atom(null);
export const addNodeAtom = atom(null);

const TaskView = ({ goal, mutations }) => {
  const editNodeInput = useRef(null);
  const addNodeInput = useRef(null);
  const tree = goal.insertionNode;
  const { id } = useParams();
  const family = treeHelper.findFamilyByIdBFS(tree, id);
  const [rect, setRect] = useState(null);
  const [editIsShown, editHandleOpen, editHandleClose] = useModal(
    editIsShownAtom,
    editNodeAtom,
    () => {
      setTimeout(() => {
        if (editNodeInput?.current) {
          console.log(editNodeInput.current);
          editNodeInput.current.focus();
        }
      }, 100);
    }
  );
  const [addIsShown, addHandleOpen, addHandleClose] = useModal(
    addIsShownAtom,
    addNodeAtom,
    () => {
      setTimeout(() => {
        if (addNodeInput?.current) {
          console.log(addNodeInput.current);
          addNodeInput.current.focus();
        }
      }, 100);
    }
  );

  const arrowProps = {
    size: 30
  };

  // TODO: Fix lines going over other nodes
  return (
    <div id="task-view-container">
      {family.prevSibling ? (
        <NavLink to={`../task/${family.prevSibling.id}`} className="left-arrow">
          <ChevronLeft {...arrowProps} />
        </NavLink>
      ) : (
        <div className="left-arrow disabled">
          <ChevronLeft {...arrowProps} />
        </div>
      )}
      {family.parent ? (
        <NavLink to={`../task/${family.parent.id}`} className="top-arrow">
          <ChevronUp {...arrowProps} />
        </NavLink>
      ) : (
        <div className="top-arrow disabled">
          <ChevronUp {...arrowProps} />
        </div>
      )}
      {family.nextSibling ? (
        <NavLink
          to={`../task/${family.nextSibling.id}`}
          className="right-arrow"
        >
          <ChevronRight {...arrowProps} />
        </NavLink>
      ) : (
        <div className="right-arrow disabled">
          <ChevronRight {...arrowProps} />
        </div>
      )}
      <div id="content">
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
        <EditForm
          handleClose={editHandleClose}
          goalId={goal.id}
          textInputRef={editNodeInput}
        />
      </Modal>
      <Modal handleClose={addHandleClose} isShown={addIsShown}>
        <NewNodeForm
          handleClose={addHandleClose}
          goalId={goal.id}
          textInputRef={addNodeInput}
        />
      </Modal>
    </div>
  );
};

export default TaskView;
