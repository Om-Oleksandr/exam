import React from 'react';
import CardsList from './CardsList';

const OurServices = props => {
  const { className:[first, second] } = props;
  return (
    <section className={first}>
      <div>
        <span>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <CardsList className={second}/>
    </section>
  );
};

export default OurServices;
