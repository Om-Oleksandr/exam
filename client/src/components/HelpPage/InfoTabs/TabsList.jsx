import React from 'react';
import Tab from './Tab';

const TabsList = props => {
  const { tabs, className } = props;
  const mapTabs = tab => <Tab key={tab.id} tab={tab} />;
  return <div className={className}>{tabs.map(mapTabs)}</div>;
};

export default TabsList;
