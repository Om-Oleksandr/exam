import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import ModeratorDashboard from '../../components/ModeratorDashboard';

const Dashboard = props => {
  const { role, history } = props;
  return (
    <div>
      <Header />
      {role &&
        (role === CONSTANTS.ROLES.CUSTOMER ? (
          <CustomerDashboard history={history} match={props.match} />
        ) : role === CONSTANTS.ROLES.CREATOR ? (
          <CreatorDashboard history={history} match={props.match} />
        ) : (
          <ModeratorDashboard history={history} />
        ))}
    </div>
  );
};

const mapStateToProps = state => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
