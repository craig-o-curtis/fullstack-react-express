import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { ConnectedTaskListItem } from './TaskListItem';

export const TaskList = ({tasks,name,createNewTask,id})=>(
  <div className="card p-2 m-2">
      <h2>
          {name}
      </h2>
      <div>
          {tasks.map(task=>(
              <ConnectedTaskListItem {...task} key={task.id}/>
          ))}
      </div>
      <div>
          <button className="btn btn-primary btn-block mt-2" onClick={()=>createNewTask(id)}>Add New</button>
      </div>
  </div>
);

// connect store values to component via connect below
// ownProps here refers to the destructured { tasks }
const mapStateToProps = (state, {name, id}) => {
  let groupID = id;
  return {
    id: groupID,
    name: name,
    // filter tasks according to id
    tasks: state.tasks.filter( task => task.group === groupID)
  }
}

// Add upward actions here
const mapDispatchToProps = (dispatch, {id}) => {
  return {
    createNewTask() {
      console.log('creating ', id);
      dispatch( requestTaskCreation(id) );
    }
  };
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);