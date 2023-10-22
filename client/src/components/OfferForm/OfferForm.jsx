import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import CONSTANTS from '../../constants';
import {
  addOffer,
  clearAddOfferError,
  getContestById,
} from '../../store/slices/contestByIdSlice';
import styles from './OfferForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const OfferForm = props => {
  const renderOfferInput = formikProps => {
    if (props.contestType === CONSTANTS.CONTEST_TYPES.LOGO) {
      return (
        <>
          <label htmlFor='file'>
            Choose file
            <input
              type='file'
              name='offerData'
              id='file'
              onChange={event => {
                return formikProps.setFieldValue(
                  'offerData',
                  event.target.files[0]
                );
              }}
            />
          </label>
        </>
      );
    }
    return (
      <FormInput
        name='offerData'
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type='text'
        label='your suggestion'
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    props.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.setNewOffer(data).then(() => {
      props.getContest({
        contestId: props.contestId,
        page: props.paginationData.page,
        limit: props.paginationData.limit,
      });
    });
    resetForm();
  };

  const { addOfferError, clearOfferError } = props;
  const validationSchema =
    props.contestType === CONSTANTS.CONTEST_TYPES.LOGO
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <Form className={styles.form} encType='multipart/form-data'>
            {renderOfferInput(formikProps)}
            <button type='submit' className={styles.btnOffer}>
              Send Offer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setNewOffer: data => dispatch(addOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
  getContest: data => dispatch(getContestById(data)),
});

const mapStateToProps = state => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
