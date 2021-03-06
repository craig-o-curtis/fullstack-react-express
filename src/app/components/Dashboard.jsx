import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({groups}) => (
  <div>
    <h2>Dashboard</h2>
    <div className="row">
    {groups.map( group => (
      // <div key={group.id}>{group.name}</div>
      <ConnectedTaskList 
        key={group.id}
        id={group.id}
        name={group.name}
        className="col col-md-3"
      />
      
    ))}
    </div>
  </div>
);

// connect store groups to component via connect below
function mapStateToProps(state) {
  return {
    groups: state.groups
  }
}
 
export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);