import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';

export const TaskList = ({tasks, name, id, createNewTask}) => (
  <div>
    <h3>{name}</h3>
    <div>
      {tasks.map( task => (
        <div key={task.id}>
          {task.name}
        </div>
      ))}
    </div>
    <button onClick={() => createNewTask(id)}>Add New</button>
  </div>
);

// connect store values to component via connect below
// ownProps here refers to the destructured { tasks }
const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id; // passed in via props
  return {
    id: groupID,
    name: ownProps.name, // passed in via props
    // filter tasks according to id
    tasks: state.tasks.filter( task => task.group === groupID)
  }
}

// Add upward actions here
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log('creating ', id);
      dispatch( requestTaskCreation(id) );
    }
  };
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);