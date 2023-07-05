import React from 'react';
import Step from './Step';
import stepsInfo from './steps.json';
import constants from '../../../constants';
const Steps = props => {
  const mapSteps = ({ id, text }) => (
    <Step key={id} content={text} indicator={id} />
  );
  const {
    className: [container, header, innerContainer, innerItem],
  } = props;
  return (
    <section className={container}>
      <div className={header}>
        <div>
          <img
            src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/steps_logo.svg`}
            alt='logo'
          />
        </div>
        <h2>How Do Naming Contests Work?</h2>
      </div>
      <div className={innerContainer}>
        <div className={innerItem}>
          <img
            src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/steps.svg`}
            alt='picture'
          />
        </div>
        <div className={innerItem}>
          <ul>{stepsInfo.map(mapSteps)}</ul>
        </div>
      </div>
    </section>
  );
};

export default Steps;
