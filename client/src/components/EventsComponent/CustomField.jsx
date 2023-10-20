import { Field } from 'formik';
import React from 'react';
import MyDatePicker from './Date';
import cx from 'classnames';

const CustomField = props => {
  const { name, inputError, id } = props;

  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        // console.log(field, form, meta);
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
                    <input type='radio' id={id} {...field} value={id} />
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
                {/* {meta.touched && meta.error && (
                <p className='error'>{meta.error}</p>
              )} */}
              </>
            )}
          </>
        );
      }}
    </Field>
  );
};

export default CustomField;
