import { useEffect, useState } from 'react';
import treeHelper from '../utility/treeHelper';

const useTreeLayer = (tree) => {
  const layers = treeHelper.getLayers(tree);
  const [layerInd, setLayerInd] = useState(0);
  const [layer, setLayer] = useState(layers[layerInd]);

  const setToNextLayer = () => {
    if (layers.length === 0) {
      return;
    }
    if (layerInd === layers.length - 1) {
      setLayerInd(0);
    } else {
      setLayerInd(layerInd + 1);
    }
  };

  const setToPrevLayer = () => {
    if (layers.length === 0) {
      return;
    }
    if (layerInd === 0) {
      setLayerInd(layers.length - 1);
    } else {
      setLayerInd(layerInd - 1);
    }
  };

  useEffect(() => {
    setLayer(layers[layerInd]);
  }, [layerInd, setLayer]);

  return { layer, layerInd, setToNextLayer, setToPrevLayer };
};

export default useTreeLayer;
