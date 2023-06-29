import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../constants';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schems from '../../utils/validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';

const variableOptions = {
  [CONSTANTS.CONTEST_TYPES.NAME]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.CONTEST_TYPES.LOGO]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.CONTEST_TYPES.TAGLINE]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

class ContestForm extends React.Component {
  getPreference = () => {
    const { contestType } = this.props;
    switch (contestType) {
      case CONSTANTS.CONTEST_TYPES.NAME: {
        this.props.getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.CONTEST_TYPES.TAGLINE: {
        this.props.getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.CONTEST_TYPES.LOGO: {
        this.props.getData({ characteristic1: 'brandStyle' });
        break;
      }
      default:
        break;
    }
  };

  componentDidMount () {
    this.getPreference();
  }

  render () {
    const { isFetching, error } = this.props.dataForContest;
    if (error) {
      return <TryAgain getData={this.getPreference} />;
    }
    if (isFetching) {
      return <Spinner />;
    }
    return (
      <>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              title: '',
              industry: '',
              focusOfWork: '',
              targetCustomer: '',
              file: '',
              ...variableOptions[this.props.contestType],
              ...this.props.initialValues,
            }}
            onSubmit={this.props.handleSubmit}
            validationSchema={Schems.ContestSchem}
            innerRef={this.props.formRef}
            enableReinitialize
          >
            {formikProps => (
              <Form>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>Title of contest</span>
                  <FormInput
                    name='title'
                    type='text'
                    label='Title'
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <SelectInput
                    name='industry'
                    classes={{
                      inputContainer: styles.selectInputContainer,
                      inputHeader: styles.selectHeader,
                      selectInput: styles.select,
                      warning: styles.warning,
                    }}
                    header='Describe industry associated with your venture'
                    optionsArray={this.props.dataForContest.data.industry}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    What does your company / business do?
                  </span>
                  <FormTextArea
                    name='focusOfWork'
                    type='text'
                    label='e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper'
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    Tell us about your customers
                  </span>
                  <FormTextArea
                    name='targetCustomer'
                    type='text'
                    label='customers'
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <OptionalSelects {...this.props} />
                <input
                  name='file'
                  type='file'
                  onChange={event =>
                    formikProps.setFieldValue('file', event.target.files[0])
                  }
                />
                {this.props.isEditContest ? (
                  <button type='submit' className={styles.changeData}>
                    Set Data
                  </button>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isEditContest } = state.contestByIdStore;
  return {
    isEditContest,
    contestCreationStore: state.contestCreationStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = dispatch => ({
  getData: data => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm)
);
