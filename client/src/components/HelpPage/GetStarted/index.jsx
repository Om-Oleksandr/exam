import React from 'react';
import constants from '../../../constants';
const GetStarted = props => {
  const { className:[container, header, svg1, svg2] } = props;
  return (
    <div className={container}>
      <div className={header}>
        <h3>Ready to get started?</h3>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <a href='google.com'>Start A Contest</a>
      </div>
      <div className={svg1}>
        <img
          src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/getStarted_1.svg`}
          alt='svg1'
        />
      </div>
      <div className={svg2}>
        <img
          src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/getStarted_2.svg`}
          alt='svg2'
        />
      </div>
    </div>
  );
};

export default GetStarted;
