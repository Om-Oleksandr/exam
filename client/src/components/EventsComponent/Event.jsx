import React, { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { removeEvent, setAlert } from '../../store/slices/eventsSlice';
import styles from './Events.module.sass';
const Event = props => {
  const { event } = props;
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState(
    event.date - Date.now() < 0 ? 0 : event.date - Date.now()
  );
  const convertMilliseconds = milliseconds => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    const daysStr = days > 0 ? `${days} days ` : '';
    const timeFormat = `${daysStr}${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return timeFormat;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 1000);
      if (remainingTime <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    const daysDiff = differenceInDays(
      new Date(event.date),
      new Date(Date.now())
    );
    const hoursDiff = (event.date - Date.now()) / (1000 * 3600);
    if (
      (event.reminderType === 'days' &&
        daysDiff <= Number(event.reminder) &&
        event.alert === false &&
        event.isRead === false) ||
      (event.reminderType === 'hours' &&
        hoursDiff <= Number(event.reminder) &&
        event.alert === false &&
        event.isRead === false)
    ) {
      dispatch(setAlert(event.id));
    }
    return () => {
      clearInterval(interval);
    };
  }, [event, remainingTime, dispatch]);

  useEffect(() => {
    setRemainingTime(event.date - Date.now());
  }, [event]);

  const deleteEvent = (e, id) => {
    // e.target.parentNode.remove();
    dispatch(removeEvent(id));
  };
  const calculateProgress = () => {
    const totalDuration = event.date - event.createdAt;
    const remainingDuration = Math.max(remainingTime, 0); // Ensure the progress is not negative
    return ((totalDuration - remainingDuration) / totalDuration) * 100;
  };
  return (
    <li>
      <span>{event.name}</span>
      {remainingTime >= 0 ? (
        <div>
          <span>{convertMilliseconds(remainingTime)}</span>
          <button onClick={e => deleteEvent(e, event.id)}>
            <span></span>
            <span></span>
          </button>
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
