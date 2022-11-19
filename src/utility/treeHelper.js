const findDeepestLayer = (tree) => {
  let deepestLayer = 0;
  let currentDepth = 0;

  const deepestLayerHelper = (node) => {
    currentDepth++;

    if (node.children) {
      node.children.forEach((child) => {
        deepestLayerHelper(child);
      });
    }

    deepestLayer = deepestLayer < currentDepth ? currentDepth : deepestLayer;
    currentDepth--;
    return true;
  };

  if (!tree.name) {
    return deepestLayer;
  }

  deepestLayerHelper(tree);

  return deepestLayer;
};

const findBroadestLayer = (tree) => {
  let broadestLayer = 0;

  const initialNodeList = [tree];

  const broadestLayerHelper = (nodeList) => {
    broadestLayer =
      nodeList.length > broadestLayer ? nodeList.length : broadestLayer;
    if (nodeList.some((node) => node.children)) {
      const newNodeList = nodeList.reduce((list, node) => {
        if (node.children) {
          return list.concat(node.children);
        } else {
          return list;
        }
      }, []);
      broadestLayerHelper(newNodeList);
    }
  };

  broadestLayerHelper(initialNodeList);

  return broadestLayer;
};

const findNodeById = (tree, id) => {
  const testNode = {
    id: 12,
    name: 'sing more',
    children: []
  };

  return testNode;
};

export default { findDeepestLayer, findBroadestLayer, findNodeById };
