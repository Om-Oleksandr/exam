import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModeratorContests } from '../../store/slices/contestsSlice';
import ContestBox from '../ContestBox/ContestBox';
import styles from './ModeratorDashboard.module.sass'

const ModeratorDashboard = props => {
  const { contests } = useSelector(state => state.contestsList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModeratorContests());
    return () => {};
  }, [dispatch]);
  const goToExtended = contestId => {
    props.history.push(`/contest/${contestId}`);
  };
  return (
    <div className={styles.contestsContainer}>
      {contests.length > 0 ? (
        contests.map(contest => (
          <ContestBox
            key={contest.id}
            data={contest}
            goToExtended={goToExtended}
          />
        ))
      ) : (
        <div className={styles.notFound}>There is no active offers</div>
      )}
    </div>
  );
};

export default ModeratorDashboard;
