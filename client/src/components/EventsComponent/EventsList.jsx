import React from 'react';
import { useSelector } from 'react-redux';
import Event from './Event';

const EventsList = props => {
  const { events } = useSelector(state => state.events);
  const { className } = props;
  const newEvents = [...events];
  const sortEvents = newEvents.sort(
    (event1, event2) => event1.date - event2.date
  );
  const mapEvents = (event, index) => <Event event={event} key={index} />;

  return (
    <div className={className}>
      {sortEvents && sortEvents.length > 0 ? (
        <ul>
          <li>
            <h3>Events</h3>
            <h3>Remaining time</h3>
          </li>
          {sortEvents.map(mapEvents)}
        </ul>
      ) : (
        <h3>there is no upcoming events</h3>
      )}
    </div>
  );
};

export default EventsList;
