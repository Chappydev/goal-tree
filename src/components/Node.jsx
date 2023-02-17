import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Check, Edit3, Plus, X } from 'react-feather';
import { NavLink } from 'react-router-dom';
import useAnimation from '../hooks/useAnimation';
import useRect from '../hooks/useRect';
import Line from './Line';
import './Node.scss';

const Node = ({
  node,
  isFirst,
  parentRect = null,
  setRect = null,
  delayMult = 0,
  editHandleOpen = null,
  addHandleOpen = null,
  mutations
}) => {
  const [sizeObj, setSizeObj] = useState({});
  const delay = delayMult * 1000 - 300 < 0 ? 0 : delayMult * 1000 - 300;
  const colorAnimation = useAnimation('easeInOutExpo', 1000, delay);

  const [rect, currNodeRef] = useRect();
  useEffect(() => {
    if (setRect) {
      setRect(rect);
    }
  }, [rect]);

  useEffect(() => {
    if (node.isComplete) {
      setSizeObj({
        width: `${colorAnimation * 100}%`,
        height: `${colorAnimation * 100}%`
      });
    } else {
      setSizeObj({ width: '0%', height: '0%' });
    }
  }, [node.isComplete, colorAnimation]);

  if (isFirst) {
    return (
      <div className="first-node node-container">
        <div className="node-options">
          <Check
            className="check option"
            onClick={() => mutations.toggleComplete.mutate(node)}
          />
          <Edit3 className="edit option" onClick={() => editHandleOpen(node)} />
          <X
            className="x option"
            onClick={() => mutations.deleteNode.mutate(node)}
          />
        </div>
        <div className="plus-container">
          <Plus className="plus option" onClick={() => addHandleOpen(node)} />
        </div>
        <NavLink to={`../task/${node.id}`} className="node" ref={currNodeRef}>
          <div className="hidden-relative-box">
            <div className="complete-color" style={sizeObj}></div>
            {node.name}
          </div>
        </NavLink>
      </div>
    );
  }

  // TODO: Fix lines going over other nodes
  return (
    <div className="child-node node-container">
      <div className="node-options">
        <Check
          className="check option"
          onClick={() => mutations.toggleComplete.mutate(node)}
        />
        <Edit3 className="edit option" onClick={() => editHandleOpen(node)} />
        <X
          className="x option"
          onClick={() => mutations.deleteNode.mutate(node)}
        />
      </div>
      <div className="plus-container">
        <Plus className="plus option" onClick={() => addHandleOpen(node)} />
      </div>
      <NavLink to={`../task/${node.id}`} className="node" ref={currNodeRef}>
        <div className="hidden-relative-box">
          <div className="complete-color" style={sizeObj}></div>
          {node.name}
        </div>
        {currNodeRef &&
        currNodeRef.current &&
        parentRect &&
        Object.keys(parentRect).length !== 0 ? (
          <Line
            x1={parentRect.xCenter}
            y1={parentRect.yCenter}
            x2={rect.xCenter}
            y2={rect.yCenter}
            delayMult={delayMult + 1}
            isComplete={node.isComplete}
          />
        ) : null}
      </NavLink>
    </div>
  );
};
export default Node;
