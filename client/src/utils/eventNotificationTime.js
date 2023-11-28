import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
const notificationTime = (event, func, intervalId) => {
  const daysDiff = differenceInDays(new Date(event.date), new Date(Date.now()));
  const hoursDiff = (event.date - Date.now()) / (1000 * 3600);
  const minutesDiff = (event.date - Date.now()) / (1000 * 60);
  if (
    (event.reminderType === 'days' &&
      daysDiff <= Number(event.reminder) &&
      event.alert === false &&
      event.isRead === false) ||
    (event.reminderType === 'hours' &&
      hoursDiff <= Number(event.reminder) &&
      event.alert === false &&
      event.isRead === false) ||
    (event.reminderType === 'minutes' &&
      minutesDiff <= Number(event.reminder) &&
      event.alert === false &&
      event.isRead === false)
  ) {
    clearInterval(intervalId);
    func(event.id);
    toast(`One of your events coming soon ${event.name}`);
  }
};

export default notificationTime;