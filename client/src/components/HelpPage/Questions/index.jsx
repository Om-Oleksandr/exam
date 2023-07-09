import React from 'react';
import constants from '../../../constants';
const Questions = props => {
  const {
    className: [container, wrapper, offer, consultation],
  } = props;
  return (
    <section className={container}>
      <div className={wrapper}>
        <div className={offer}>
          <ul>
            <li>
              <span>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/angle-right.svg`}
                  alt='angle'
                />
              </span>
              <div>
                <h4>Pay a Fraction of cost vs hiring an agency</h4>
                <p>
                  For as low as $199, our naming contests and marketplace allow
                  you to get an amazing brand quickly and affordably.
                </p>
              </div>
            </li>
            <li>
              <span>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/angle-right.svg`}
                  alt='angle'
                />
              </span>
              <div>
                <h4>Satisfaction Guarantee</h4>
                <p>
                  Of course! We have policies in place to ensure that you are
                  satisfied with your experience.
                  <a href='google.com'> Learn more</a>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={consultation}>
          <div>
            <h4>Questions?</h4>
            <p>
              Speak with a Squadhelp platform expert to learn more and get your
              questions answered.
            </p>
            <button>schedule consultation</button>
            <a href='tel:8773553585'>
              <span>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/phone_icon.svg`}
                  alt='phone'
                />
              </span>
              (877) 355-3585
            </a>
            <span>Call us for assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
