import React, { useState } from 'react';
import './NewNodeForm.scss';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import Button from './Button';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import { generateId } from '../utility/miscFunctions';
import treeHelper from '../utility/treeHelper';
import { useAtomValue } from 'jotai';
import { addNodeAtom } from './TaskView';

const NewNodeForm = ({ handleClose, goalId }) => {
  const node = useAtomValue(addNodeAtom);
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
    onMutate: async ({ name, parentId, insertInd }) => {
      await queryClient.cancelQueries({ queryKey: ['treeData', goalId] });

      const prevGoal = queryClient.getQueryData(['treeData', goalId]);

      const newNode = {
        id: generateId(),
        name,
        isComplete: false,
        children: []
      };

      const newTree = treeHelper.findNodeByIdDFSAndUpdate(
        prevGoal.insertionNode,
        parentId,
        (node) => {
          node.children.splice(insertInd, 0, newNode);
          return node;
        }
      );

      const newGoal = { ...prevGoal, insertionNode: newTree };

      queryClient.setQueryData(['treeData', goalId], newGoal);

      return { prevGoal, newGoal };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['treeData', goalId], context.prevGoal);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['treeData', goalId] });
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
      {/* <label>
        <input
          type="number"
          className="number-input index"
          min="1"
          max={node.children.length + 1}
          value={ind}
          onChange={handleChange}
        />
      </label> */}
      <NumberInput
        setValue={setInd}
        value={ind}
        min={1}
        max={node.children.length + 1}
        label="Insertion Node"
      />
      {/* <label>
        Name:
        <input
          className="text-input name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label> */}
      <TextInput setValue={setName} name="name" value={name} label="Name" />
      <div className="form-buttons">
        {/* <button
          className="modal-button close"
          type="button"
          onClick={() => handleClose()}
        >
          Close
        </button>
        <button className="modal-button submit" type="submit">
          Submit
        </button> */}

        <Button onClick={handleClose}>Close</Button>
        <Button color="primary" fillType="fill" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default NewNodeForm;
