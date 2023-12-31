import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { addEvent, markAllRead } from '../../store/slices/eventsSlice';
import AddForm from './AddForm';
import EventsList from './EventsList';
import styles from './Events.module.sass';

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events);
  const onSubmit = (values, formikBag) => {
    values.date = values.date.getTime();
    values.reminder = Number(values.reminder);
    values.id = Date.now();
    values.createdAt = Date.now();
    values.alert = false;
    values.isRead = false;
    dispatch(addEvent(values));
    formikBag.resetForm();
  };
  const filteredEvents = events.filter(event => event.alert === true);
  const markAsRead = () => {
    dispatch(markAllRead());
  };
  return (
    <>
      <Header />
      <section className={styles.main}>
        <button onClick={markAsRead} disabled={filteredEvents.length === 0}>
          mark all as read
        </button>
        <AddForm
          onSubmit={onSubmit}
          className={[
            styles.form,
            styles.reminder,
            styles.radioSection,
            styles.inputError,
            styles.indicator,
          ]}
        />
        <EventsList className={styles.list} />
      </section>
      <Footer />
    </>
  );
};

export default Events;
