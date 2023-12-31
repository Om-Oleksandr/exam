import React from 'react';
import constants from '../../../constants';
import styles from './Card.module.sass';

const Card = props => {
  const { cardInfo } = props;
  return (
    <article className={styles.wrapper}>
      <div className={styles.body}>
        <div>
          <div className={styles.imgContainer}>
            <img
              src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/${cardInfo.imageName}`}
              alt='card'
            />
          </div>
          <h3>
            {cardInfo.title}
          </h3>
          <p>{cardInfo.content}</p>
        </div>
        <a href='google.com'>{cardInfo.btnText}</a>
      </div>
    </article>
  );
};
export default Card;
