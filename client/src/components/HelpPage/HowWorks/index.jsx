import React, { useRef, useState } from 'react';
import cx from 'classnames';
import constants from '../../../constants';
import styles from './HowWorks.module.sass';
const HowWorks = props => {
  const [display, setDisplay] = useState(false);
  const iFrameRef = useRef(null);
  const { className } = props;
  const playVideo = e => {
    const body = document.body;
    body.style = 'overflow: hidden';
    setDisplay(true);
    e.preventDefault();
  };
  const closeVideo = () => {
    if (iFrameRef.current) {
      const iframe = iFrameRef.current;
      iframe.contentWindow.postMessage(
        JSON.stringify({ method: 'pause' }),
        '*'
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({ method: 'setCurrentTime', value: 0 }),
        '*'
      );
    }
    const body = document.body;
    body.style.overflow = 'auto';
    setDisplay(false);
  };
  return (
    <>
      <div className={cx(styles.video, { [styles.display]: display })}>
        <iframe
          ref={iFrameRef}
          src='https://player.vimeo.com/video/826948811?h=aac5a8441b&title=0&byline=0&portrait=0'
          width='640'
          height='360'
          frameborder='0'
          allow='autoplay; fullscreen; picture-in-picture'
          allowfullscreen
        ></iframe>
        <button onClick={closeVideo}></button>
      </div>

      <section className={className}>
        <div className={styles.firstColumn}>
          <span>World's #1 Naming Platform</span>
          <div>
            <h1>How Does Squadhelp Work?</h1>
            <p>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </div>
          <a
            href='https://player.vimeo.com/video/826948811'
            onClick={playVideo}
          >
            <img src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/play.svg`} />
            play video
          </a>
        </div>
        <div className={styles.secondColumn}>
          <img src={`${constants.STATIC_IMAGES_PATH}helpPageImgs/hero.svg`} />
        </div>
      </section>
    </>
  );
};

export default HowWorks;
