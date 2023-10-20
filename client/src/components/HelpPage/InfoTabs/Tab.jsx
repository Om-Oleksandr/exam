import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import constants from '../../../constants';
import { createId, replaceWithLink } from '../../../helpers';
import styles from './Tab.module.sass';
const Tab = props => {
  const { tab } = props;
  const { linkAnchor } = useSelector(state => state.tabs);
  const htmlId = createId(tab.title);

  const initialState = tab.items.map((item, index) => ({
    id: item.id,
    height: null,
    isOpen: index === 0 ? true : false,
  }));

  const [tabItemOpen, setTabItemOpen] = useState(initialState);

  const handleClick = id => {
    const cardBody = document.getElementById(htmlId + id);
    setTabItemOpen(
      tabItemOpen.map(elem => {
        return {
          ...elem,
          height: cardBody.getBoundingClientRect().height,
          isOpen: elem.id === id ? !elem.isOpen : false,
        };
      })
    );
  };

  const mapItems = (item, index) => {
    return (
      <article key={item.id} className={styles.card}>
        <div className={styles.cardController}>
          <h5>
            <button
              onClick={() => handleClick(item.id)}
              className={cx({
                [styles.open]: tabItemOpen[index].isOpen,
              })}
            >
              {item.header}
              <span>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/arrow.svg`}
                  alt='arrow'
                />
              </span>
            </button>
          </h5>
        </div>
        <div
          className={styles.cardContent}
          style={{
            height: tabItemOpen[index].isOpen ? tabItemOpen[index].height : 0,
          }}
        >
          <div id={htmlId + item.id} className={styles.contentBody}>
            {replaceWithLink(item, item.content)}
            {item.list && (
              <ul>
                {item.list.map((li, index) => (
                  <li key={index}>{replaceWithLink(item, li)}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    );
  };
  useEffect(() => {
    if (linkAnchor !== null) {
      const tabItem = document.getElementById(linkAnchor);
      console.log(tabItem.offsetTop);
      window.scrollTo({
        top: tabItem.offsetTop - 30,
        behavior: 'smooth',
      });
    }
    setTabItemOpen(
      tabItemOpen.map((elem, index) => {
        const id = index + 1;
        const cardBody = document.getElementById(htmlId + id);
        return {
          ...elem,
          height: cardBody.getBoundingClientRect().height,
        };
      })
    );
    window.addEventListener('resize', () =>
      setTabItemOpen(prevTab =>
        prevTab.map((elem, index) => {
          const id = index + 1;
          const cardBody = document.getElementById(htmlId + id);
          return {
            ...elem,
            height: cardBody.getBoundingClientRect().height,
          };
        })
      )
    );
    return () => {};
  }, [linkAnchor]);
  return (
    <section id={htmlId} className={styles.item}>
      <h3>{tab.title}</h3>
      {tab.items.map(mapItems)}
    </section>
  );
};

export default Tab;
