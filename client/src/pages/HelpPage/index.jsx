import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWorks from '../../components/HelpPage/HowWorks';
import OurServices from '../../components/HelpPage/OurServices';
import styles from './HelpPage.module.sass';
const HelpPage = () => {
  return (
    <>
      <Header />
      <HowWorks className={styles.heroContainer} />
      <OurServices className={[styles.servicesContainer, styles.cardsList]} />
      <Footer />
    </>
  );
};

export default HelpPage;
