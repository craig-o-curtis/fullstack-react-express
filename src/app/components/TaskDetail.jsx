/**
 * The task detail component route is a more sophisticated form that has many different fields.
 * The component automatically calls the REST API [via a mutation] to update the server on every change.
 */
import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ConnectedUsernameDisplay } from "./UsernameDisplay";
import {
  setTaskCompletion,
  addTaskComment,
  setTaskGroup,
  setTaskName
} from "../store/mutations";

const TaskDetail = ({
  id,
  comments,
  task,
  isOwner,
  isComplete,
  sessionID,
  groups,

  setTaskCompletion,
  addTaskComment,
  setTaskGroup,
  setTaskName
}) => {
  return (
    <div className="card p-3 col-xs-12 col-md-6 offset-md-3">
      {isOwner ? (
        <div className="form-group">
          <input
            type="text"
            value={task.name}
            onChange={setTaskName}
            className="form-control form-control-lg"
          />
        </div>
      ) : (
        <h3>
          {task.name} {isComplete ? `✓` : null}
        </h3>
      )}

      <div className="mt-3">
        {isOwner ? (
          <div>
            <div className="form-group">
              <span>You are the owner of this task.</span>
              <button
                className="btn btn-primary ml-2"
                onClick={() => setTaskCompletion(id, !isComplete)}
              >
                {isComplete ? `Reopen` : `Complete`} This Task
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ConnectedUsernameDisplay id={task.owner} /> is the owner of this
            task.
          </div>
        )}
      </div>

      {/* Change Group Selector */}
      <form className="mt-3">
        <div className="input-group">
        <label htmlFor="group-selector" className="mr-4">Change Group</label>
        <select id="group-selector" onChange={setTaskGroup} className="form-control custom-select">
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        </div>
      </form>

      {/* Comments */}
      <div className="mt-2 alert alert-dark">
        {comments.map(comment => (
          <div key={comment.id}>
            <ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}
          </div>
        ))}
      </div>
      {/* Add Comment */}
      <form className="" onSubmit={e => addTaskComment(id, sessionID, e)}>
        <div className="form-group input-group">
          <input
            type="text"
            name="commentContents"
            autoComplete="off"
            placeholder="Add a comment"
            className="form-control"
          />
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </div>
      </form>

      <div>
        <Link to="/dashboard">
          <button className="btn btn-primary mt-2 form-control">Done</button>
        </Link>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let comments = state.comments.filter(comment => comment.task === id);
  let isOwner = state.session.id === task.owner;
  let groups = state.groups;

  return {
    id,
    task,
    comments,
    isOwner,
    sessionID: state.session.id,
    isComplete: task.isComplete,
    groups
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(setTaskName(id, e.target.value));
    },
    addTaskComment(taskID, ownerID, e) {
      let input = e.target[`commentContents`];
      let commentID = uuid();
      let content = input.value;
      e.preventDefault();
      if (content !== ``) {
        input.value = ``;
        dispatch(addTaskComment(commentID, taskID, ownerID, content));
      }
    }
  };
}

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
