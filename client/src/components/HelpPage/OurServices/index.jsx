import React from 'react';
import CardsList from './CardsList';

const OurServices = props => {
  const { className:[container, header, list] } = props;
  return (
    <section className={container}>
      <div className={header}>
        <span>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </div>
      <CardsList className={list}/>
    </section>
  );
};

export default OurServices;
