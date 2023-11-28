import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import {
  removeEvent,
  markRead,
} from '../../store/slices/eventsSlice';
import styles from './Events.module.sass';
import convertMilliseconds from '../../utils/convertToMilliseconds';

const Event = props => {
  const { event } = props;
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState(
    event.date - Date.now() < 0 ? 0 : event.date - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 1000);
      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [event, remainingTime, dispatch]);

  useEffect(() => {
    setRemainingTime(event.date - Date.now());
  }, [event]);

  const deleteEvent = id => {
    dispatch(removeEvent(id));
  };
  const readEvent = id => {
    dispatch(markRead(id));
  };
  const calculateProgress = () => {
    const totalDuration = event.date - event.createdAt;
    const remainingDuration = Math.max(remainingTime, 0);
    return ((totalDuration - remainingDuration) / totalDuration) * 100;
  };
  return (
    <li className={cx({ [styles.alert]: event.alert })}>
      <span>{event.name}</span>
      {remainingTime >= 0 ? (
        <div>
          <span>{convertMilliseconds(remainingTime)}</span>
          <button onClick={() => deleteEvent(event.id)}>
            <span></span>
            <span></span>
          </button>
          <button onClick={() => readEvent(event.id)} className={styles.markRead} disabled={!event.alert}>Read</button>
        </div>
      ) : (
        setRemainingTime(0)
      )}
      <span
        className={styles.progressTimer}
        style={{ width: calculateProgress() + '%' }}
      ></span>
    </li>
  );
};

export default Event;
