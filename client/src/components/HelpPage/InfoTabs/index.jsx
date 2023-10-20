import React from 'react';
import { useDispatch } from 'react-redux';
import TabsList from './TabsList';
import tabs from './tabs.json';
import { createId } from '../../../helpers';
import { setLink } from '../../../store/slices/tabsMenuSlice';
const InfoTabs = props => {
  const {
    className: [container, nav, list],
  } = props;
  const dispatch = useDispatch();
  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(setLink(id));
  };
  const mapNav = tab => {
    const id = createId(tab.title);
    return (
      <li key={tab.id}>
        <a href={id} onClick={e => handleClick(e, id)}>
          {tab.title}
        </a>
      </li>
    );
  };
  return (
    <section className={container}>
      <div className={nav}>
        <nav>
          <ul>{tabs.map(mapNav)}</ul>
        </nav>
      </div>
      <TabsList tabs={tabs} className={list} />
    </section>
  );
};

export default InfoTabs;
