import React from 'react';
import { Field } from 'formik';
import cx from 'classnames';
import CustomField from './CustomField';

const RadioGroup = props => {
  const {
    classNames: [radio, inputError],
  } = props;
  return (
    <Field>
      {({ field, form, meta }) => {
        console.log(meta);
        return (
          <div
            className={cx(radio, { [inputError]: meta.error.hasOwnProperty('reminderType') && meta.touched })}
          >
            <CustomField
              name='reminderType'
              type='radio'
              value='days'
              id='days'
              inputError={inputError}
            />
            <CustomField
              name='reminderType'
              type='radio'
              value='hours'
              id='hours'
              inputError={inputError}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default RadioGroup;
