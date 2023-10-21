import { Field } from 'formik';
import React from 'react';
import MyDatePicker from './Date';
import cx from 'classnames';

const CustomField = props => {
  const { name, inputError, id, checked } = props;
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        return (
          <>
            {name !== 'date' ? (
              <>
                {name !== 'reminderType' ? (
                  <>
                    <input
                      type='text'
                      {...field}
                      className={cx({
                        [inputError]: meta.error && meta.touched,
                      })}
                    />
                  </>
                ) : (
                  <label htmlFor={id}>
                    <input type='radio' id={id} {...field} value={id} checked={checked}/>
                    <span></span>
                    {id}
                  </label>
                )}
              </>
            ) : (
              <>
                <MyDatePicker
                  name={name}
                  className={cx({ [inputError]: meta.error && meta.touched })}
                />
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default CustomField;
