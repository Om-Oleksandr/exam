import React from 'react';
import { Field, Form, Formik } from 'formik';
import MyDatePicker from './Date';

const AddForm = props => {
  const {
    onSubmit,
    className: [form, reminder, radio],
  } = props;
  return (
    <div className={form}>
      <Formik
        initialValues={{
          name: '',
          date: '',
          reminder: '',
          reminderType: '',
        }}
        onSubmit={onSubmit}
      >
        <Form autoComplete='off'>
          <div>
            <span>event</span>
            <Field name='name'/>
          </div>

          <div>
            <span>date</span>
            <MyDatePicker name='date' />
          </div>

          <div>
            <span>reminder</span>
            <div className={reminder}>
              <Field name='reminder'/>
              <div className={radio}>
                <label htmlFor='days'>
                  <Field
                    type='radio'
                    name='reminderType'
                    value='days'
                    id='days'
                  />
                  days
                  <span></span>
                </label>
                <label htmlFor='hours'>
                  <Field
                    type='radio'
                    name='reminderType'
                    value='hours'
                    id='hours'
                  />
                  hours
                  <span></span>
                </label>
              </div>
            </div>
          </div>

          <input type='submit' value='add event' />
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
