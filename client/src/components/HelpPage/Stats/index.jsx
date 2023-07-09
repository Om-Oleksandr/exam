import React from 'react';
import stats from './stats.json';
import Stat from './Stat';

const Stats = props => {
  const { className } = props;
  const mapStats = stat => <Stat stat={stat} />;
  return (
    <section className={className}>
      <div>{stats.map(mapStats)}</div>
    </section>
  );
};

export default Stats;
