import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import Schems from '../../utils/validators/validationSchems';
import CustomField from './CustomField';
import RadioGroup from './RadioGroup';
const AddForm = props => {
  const {
    onSubmit,
    className: [form, reminder, radio, inputError],
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
        validationSchema={Schems.EventSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete='off'>
          <div>
            <span>event {<ErrorMessage name='name' />}</span>
            <CustomField name='name' inputError={inputError} />
          </div>

          <div>
            <span>date {<ErrorMessage name='date' />}</span>
            <CustomField name='date' inputError={inputError} />
          </div>

          <div>
            <span>reminder {<ErrorMessage name='reminder' />}</span>
            <div className={reminder}>
              <CustomField name='reminder' inputError={inputError} />
              <RadioGroup classNames={[radio, inputError]}/>
            </div>
          </div>

          <input type='submit' value='add event' />
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
