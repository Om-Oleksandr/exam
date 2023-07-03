import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowWorks from '../../components/HelpPage/HowWorks';
import styles from './HelpPage.module.sass'
const HelpPage = () => {
  return (
    <>
      <Header />
        <HowWorks className={styles.container}/>
      <Footer />
    </>
  );
};

export default HelpPage;
