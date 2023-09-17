import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModeratorContests } from '../../store/slices/contestsSlice';
import ContestBox from '../ContestBox/ContestBox';
import styles from './ModeratorDashboard.module.sass';

const ModeratorDashboard = props => {
  const { contests } = useSelector(state => state.contestsList);
  console.log(contests);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const totalItems = contests.length;
  const totalPages =
    totalItems % limit === 0 ? totalItems / limit : totalItems / limit + 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getModeratorContests({ offset: offset, limit: limit }));
    return () => {};
  }, [dispatch, limit, offset]);
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
      setOffset(offset => offset - limit);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page => page + 1);
      setOffset(offset => offset + limit);
    }
  };

  return (
    <div className={styles.contestsContainer}>
      <div>
        {contests.length > 0 ? (
          <ul>{contests.map(mapContests)}</ul>
        ) : (
          <div className={styles.notFound}>There is no active contests</div>
        )}
      </div>
      <div>
        <button onClick={handlePrev}>prev</button>
        <span>{page}</span>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
