import React from 'react';
import CardsInfo from './CardsInfo.json';
import Card from './Card';
const CardsList = props => {
  const { className } = props;
  const mapCards = (card, index) => <Card cardInfo={card} key={index} />;
  return <div className={className}>{CardsInfo.map(mapCards)}</div>;
};

export default CardsList;
