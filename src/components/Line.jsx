import React from 'react';

const Line = ({ x1, y1, x2, y2 }) => {
  return (
    <svg className="tree-line-svg">
      {/* 
          TODO: change styles to taste
          TODO: figure out animations for the styles as well 
        */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="tree-line" />
    </svg>
  );
};

export default Line;
