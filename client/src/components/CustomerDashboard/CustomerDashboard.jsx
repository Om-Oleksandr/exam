import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  loadMore = startFrom => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidMount () {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      limit: 8,
      offset: 0,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = contest_id => {
    this.props.history.push(`/contest/${contest_id}`);
  };

  mapContests = elem => (
    <ContestBox data={elem} key={elem.id} goToExtended={this.goToExtended} />
  );
  componentWillUnmount () {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render () {
    const { error, haveMore, customerFilter, contests } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUSES.ACTIVE)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUSES.ACTIVE === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUSES.ACTIVE !== customerFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUSES.FINISHED)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUSES.FINISHED === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUSES.FINISHED !== customerFilter,
            })}
          >
            Completed contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUSES.PENDING)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUSES.PENDING === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUSES.PENDING !== customerFilter,
            })}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}
            >
              {contests.map(this.mapContests)}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.contestsList;

const mapDispatchToProps = dispatch => ({
  getContests: data =>
    dispatch(
      getContests({ requestData: data, role: CONSTANTS.ROLES.CUSTOMER })
    ),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
