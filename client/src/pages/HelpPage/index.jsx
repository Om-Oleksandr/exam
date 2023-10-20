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
import Questions from '../../components/HelpPage/Questions';
import constants from '../../constants';
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
      <Stats className={styles.statsContainer} />
      <Questions
        className={[
          styles.questionsContainer,
          styles.questionsWrapper,
          styles.offer,
          styles.consultation,
        ]}
      />
      <section className={styles.sponsorsContainer}>
        <div className={styles.sponsorsWrapper}>
          <div className={styles.sponsorsHeader}>
            <h6>Featured In</h6>
          </div>
          <div className={styles.sponsorsLogos}>
            <div className={styles.sponsorLogo}>
              <a href='google.com'>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
                  alt='sponsor'
                />
              </a>
            </div>
            <div className={styles.sponsorLogo}>
              <a href='google.com'>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
                  alt='sponsor'
                />
              </a>
            </div>
            <div className={styles.sponsorLogo}>
              <a href='google.com'>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}sponsors/chicago.png`}
                  alt='sponsor'
                />
              </a>
            </div>
            <div className={styles.sponsorLogo}>
              <a href='google.com'>
                <img
                  src={`${constants.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
                  alt='sponsor'
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HelpPage;
