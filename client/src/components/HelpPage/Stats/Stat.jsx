import React from 'react';
import constants from '../../../constants';
import styles from './Stat.module.sass'
const Stat = props => {
  const { stat } = props;
  return (
    <article className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImage}>
          <img
            src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/${stat.imgName}`}
            alt='stat'
          />
        </div>
        <p>{stat.content}</p>
      </div>
    </article>
  );
};

export default Stat;
