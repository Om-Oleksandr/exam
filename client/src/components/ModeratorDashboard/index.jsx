import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { getModeratorContests } from '../../store/slices/contestsSlice';
import ContestBox from '../ContestBox/ContestBox';
import styles from './ModeratorDashboard.module.sass';
const ModeratorDashboard = props => {
  const { contests, totalContests } = useSelector(state => state.contestsList);
  const [limit] = useState(5);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModeratorContests({ page, limit: limit }));
    return () => {};
  }, [dispatch, limit, page]);
  const goToExtended = contestId => {
    props.history.push(`/contest/${contestId}`);
  };
  const mapContests = elem => (
    <li key={elem.id}>
      {<ContestBox data={elem} goToExtended={goToExtended} />}
    </li>
  );
  const handlePrev = () => {
    if (page > 1) {
      setPage(page => page - 1);
    }
  };
  const handleNext = () => {
    if (totalContests >= limit) {
      setPage(page => page + 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contestsContainer}>
        {contests.length > 0 ? (
          <ul>{contests.map(mapContests)}</ul>
        ) : (
          <div className={styles.notFound}>There is no active contests</div>
        )}
      </div>
      <div className={styles.buttonsContainer}>
        <button
          onClick={handlePrev}
          className={cx({ [styles.disabled]: page === 1 })}
        >
          {'<'}
        </button>
        <span>{page}</span>
        <button
          onClick={handleNext}
          className={cx({
            [styles.disabled]:
              page ===
              (totalContests % limit === 0
                ? totalContests / limit
                : Math.floor(totalContests / limit) + 1),
          })}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
