import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWorks from '../../components/HelpPage/HowWorks';
import OurServices from '../../components/HelpPage/OurServices';
import styles from './HelpPage.module.sass';
import Steps from '../../components/HelpPage/Steps';
import InfoTabs from '../../components/HelpPage/InfoTabs';
import GetStarted from '../../components/HelpPage/GetStarted';
import Stats from '../../components/HelpPage/Stats';
const HelpPage = () => {
  return (
    <>
      <Header />
      <HowWorks className={styles.heroContainer} />
      <OurServices
        className={[
          styles.servicesContainer,
          styles.servicesHeader,
          styles.cardsList,
        ]}
      />
      <Steps
        className={[
          styles.stepsContainer,
          styles.stepsHeader,
          styles.stepsInnerContainer,
          styles.innerItem,
        ]}
      />
      <InfoTabs
        className={[styles.tabsContainer, styles.tabsNav, styles.tabsList]}
      />
      <GetStarted
        className={[
          styles.startContainer,
          styles.startHeader,
          styles.firstSvg,
          styles.secondSvg,
        ]}
      />
      <Stats className={styles.statsContainer}/>
      <Footer />
    </>
  );
};

export default HelpPage;
