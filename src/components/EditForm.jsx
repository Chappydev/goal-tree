import React, { useState } from 'react';
import './EditForm.scss';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryFunctions from '../utility/queryFunctions';
import Button from './Button';
import TextInput from './TextInput';
import treeHelper from '../utility/treeHelper';
import { useAtomValue } from 'jotai';
import { editNodeAtom } from './TaskView';

const EditForm = ({ handleClose, goalId }) => {
  const node = useAtomValue(editNodeAtom);
  const [name, setName] = useState(node?.name ? node.name : '');
  const queryClient = useQueryClient();

  useEffect(() => {
    setName(node?.name ? node.name : '');
  }, [node]);

  const updateName = useMutation({
    mutationFn: () => {
      const newNode = {
        ...node,
        name,
        children: node.children.map((child) => child.id)
      };
      return queryFunctions.updateNode(newNode);
    },
    onMutate: async (currNode) => {
      await queryClient.cancelQueries({ queryKey: ['treeData', goalId] });

      const newNode = {
        ...currNode,
        name
      };

      const prevGoal = queryClient.getQueryData(['treeData', goalId]);

      const newTree = treeHelper.findNodeByIdDFSAndUpdate(
        prevGoal.insertionNode,
        newNode.id,
        newNode
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
    updateName.mutate(node);
    handleClose();
  };

  if (!node) {
    return <p>Something went wrong...</p>;
  }

  return (
    <form className="form edit" onSubmit={handleSubmit}>
      {/* <input
        className="input"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      <TextInput setValue={setName} name="name" value={name} label="Name" />
      <div className="form-buttons">
        {/* <button
          className="modal-button close"
          type="button"
          onClick={handleClose}
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

export default EditForm;
