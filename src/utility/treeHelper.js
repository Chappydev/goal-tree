import Queue from './queue';

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

const getOneLayer = (nodeList) => {
  // Creates array from all the arrays of children and then flattens it out
  const layer = nodeList.flatMap((node) => node.children);
  return layer;
};

const getLayersHelper = (nodeList, layers) => {
  if (nodeList.length < 1) return layers;

  const nextLayer = getOneLayer(nodeList);
  if (nextLayer.length > 0) {
    layers.push(nextLayer);
  }
  return getLayersHelper(nextLayer, layers);
};

const getLayers = (tree) => {
  const layers = getLayersHelper([tree], []);
  return layers;
};

const findNodeByIdBFS = (node, id) => {
  if (!node) {
    return false;
  }

  let queue = new Queue();

  queue.enqueue(node);

  while (queue.size !== 0) {
    if (queue.first.value.id === id) {
      return queue.first.value;
    }

    const nodeChildren = queue.first.value.children;

    if (nodeChildren.length !== 0) {
      nodeChildren.forEach((child) => queue.enqueue(child));
    }

    queue.dequeue();
  }

  return null;
};

const findNodeByIdDFSAndUpdate = (node, id, newNode) => {
  if (!node) {
    return false;
  }

  const nodeCopy = structuredClone(node);

  const updateNodeHelper = (node, id, newNode) => {
    if (node.id === id) {
      if (typeof newNode === 'object') {
        return newNode;
      } else {
        return newNode(node);
      }
    }

    if (node.children.length < 1) {
      return node;
    }

    node.children = node.children.map((child) =>
      updateNodeHelper(child, id, newNode)
    );
    return node;
  };

  return updateNodeHelper(nodeCopy, id, newNode);
};

const findNodeByIdDFSAndDelete = (node, id) => {
  if (!node) {
    return false;
  }

  const nodeCopy = structuredClone(node);

  let found = false;
  const deleteNodeHelper = (node, id) => {
    if (node.id === id) {
      return null;
    }

    if (node.children.length < 1) {
      return node;
    }

    const children = [];
    for (let child of node.children) {
      if (child.id === id) {
        found = true;
        continue;
      }

      children.push(found ? child : deleteNodeHelper(child, id));
    }

    node.children = children;
    return node;
  };

  return deleteNodeHelper(nodeCopy, id);
};

const testBFS = (node) => {
  if (!node) {
    return false;
  }

  let queue = new Queue();

  let nodeList = [];

  queue.enqueue(node);

  while (queue.size !== 0) {
    console.log(queue.first.value);
    const nodeChildren = queue.first.value.children;

    if (nodeChildren.length !== 0) {
      nodeChildren.forEach((child) => queue.enqueue(child));
    }

    nodeList.push(queue.first.value);

    queue.dequeue();
  }

  return nodeList;
};

const findFamilyByIdBFS = (tree, id) => {
  if (!tree) {
    return false;
  }

  let queue = new Queue();

  queue.enqueue(tree);

  // Check if root node has matching id
  if (queue.first.value.id.toString() === id) {
    const parent = null;
    const currentNode = queue.first.value;
    const prevSibling = null;
    const nextSibling = null;
    const children = currentNode.children;

    return { parent, currentNode, prevSibling, nextSibling, children };
  }

  while (queue.size !== 0) {
    if (
      queue.first.value.children.some((child) => child.id.toString() === id)
    ) {
      const parent = queue.first.value;
      const currentNodeIndex = parent.children.findIndex(
        (child) => child.id.toString() === id
      );
      const currentNode = parent.children[currentNodeIndex];
      const prevSibling = parent.children[currentNodeIndex - 1] || null;
      const nextSibling = parent.children[currentNodeIndex + 1] || null;
      const children = currentNode.children;

      return { parent, currentNode, prevSibling, nextSibling, children };
    }

    const nodeChildren = queue.first.value.children;

    if (nodeChildren.length !== 0) {
      nodeChildren.forEach((child) => queue.enqueue(child));
    }

    queue.dequeue();
  }

  return {};
};

const replaceChildIdWithNode = (node, nodeList) => {
  if (node.children.length < 1) {
    return node;
  }

  const newChildren = node.children.map((id) => {
    return nodeList.find((node) => node.id === id);
  });

  const newChildrenTree = newChildren.map((child) => {
    return replaceChildIdWithNode(child, nodeList);
  });

  const newNode = { ...node, children: newChildrenTree };

  return newNode;
};

const buildTree = ({ insertionNodeId, nodes }) => {
  const initNode = nodes.find((node) => (node.id = insertionNodeId));

  const tree = replaceChildIdWithNode(initNode, nodes);

  return tree;
};

export default {
  findDeepestLayer,
  findBroadestLayer,
  getLayers,
  findNodeByIdBFS,
  findFamilyByIdBFS,
  findNodeByIdDFSAndUpdate,
  findNodeByIdDFSAndDelete,
  testBFS,
  buildTree
};
