import React, { useState } from 'react';
import './NewNodeForm.scss';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import queryFunctions from '../utility/queryFunctions';

const NewNodeForm = ({ node, handleClose }) => {
  const [name, setName] = useState('');
  const [ind, setInd] = useState(node ? node.children.length + 1 : 1);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (node) {
      setInd(node.children.length + 1);
    }
  }, [node]);

  const addNode = useMutation({
    mutationFn: ({ name, parentId, insertInd }) => {
      return queryFunctions.insertNode(name, parentId, insertInd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNode.mutate({ name, parentId: node.id, insertInd: ind - 1 });
    setName('');
    handleClose();
  };

  const handleChange = (e) => {
    if (!node) {
      return;
    }

    if (e.target.value < 1) {
      setInd(1);
    } else if (e.target.value > node?.children.length + 1) {
      setInd(node.children.length + 1);
    } else {
      setInd(e.target.value);
    }
  };

  if (!node) {
    return <p>Something went wrong...</p>;
  }

  return (
    <form className="form add" onSubmit={handleSubmit}>
      <p>Parent Node: {node?.name}</p>
      <label>
        <input
          type="number"
          className="number-input index"
          min="1"
          max={node.children.length + 1}
          value={ind}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          className="text-input name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="form-buttons">
        <button
          className="modal-button close"
          type="button"
          onClick={() => handleClose()}
        >
          Close
        </button>
        <button className="modal-button submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewNodeForm;
