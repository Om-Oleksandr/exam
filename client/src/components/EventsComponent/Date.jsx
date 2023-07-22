import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({ name = '' }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      showTimeSelect
      showMonthDropdown
      showYearDropdown
      dateFormat='MM.dd.yyyy HH:mm'
      timeFormat='HH:mm'
      timeIntervals={15}
      onChange={date => setValue(date)}
    />
  );
};
export default MyDatePicker;
