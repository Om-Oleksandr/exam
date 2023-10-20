import React from 'react';
import styles from './Step.module.sass';

const Step = props => {
  const { indicator, content } = props;
  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.indicator}>
          <span>{indicator}.</span>
        </div>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </div>
    </li>
  );
};

export default Step;
