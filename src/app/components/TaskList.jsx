import React from 'react';
import { connect } from 'react-redux';

export const TaskList = ({tasks, name}) => (
  <div>
    <h3>{name}</h3>
    <div>
      {tasks.map( task => (
        <div key={task.id}>
          {task.name}
        </div>
      ))}
    </div>
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

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);