import ClassName from 'models/classname';
import useSite from 'hooks/use-site';

import Image from 'components/Image';
import Section from 'components/Section';
import Container from 'components/Container';

import styles from './Hero.module.scss';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = ({ homePage, className }) => {
  const { metadata: siteMetadata = {} } = useSite();

  const heroClassName = new ClassName(styles.heroSection);

  heroClassName.addIf(className, className);

  const logoContainerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: logoContainerRef,
    offset: ['start start', 'end start'],
  });

  const heroBackgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const heroLogoY = useTransform(scrollYProgress, [0, 1], ['0%', '175%']);
  const isLogoInView = useInView(logoContainerRef);

  return (
    <Section className={styles.heroSection}>
      <Container>
        <motion.div className={styles.heroSection__imageWrapper} style={{ y: heroBackgroundY }}>
          {homePage.heroImage && (
            <Image
              {...homePage.heroImage}
              src={homePage.heroImage.sourceUrl}
              width={2560}
              height={1260}
              className={styles.heroSection__image}
            />
          )}
        </motion.div>

        <motion.div
          className={styles.heroSection__logo}
          ref={logoContainerRef}
          initial={{ y: '-800px', opacity: 0 }}
          animate={isLogoInView ? { y: '0', opacity: 1 } : {}}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          delay={{}}
        >
          <motion.div style={{ y: heroLogoY }}>
            {homePage.logo && (
              <Image
                {...homePage.logo}
                src={homePage.logo.sourceUrl}
                width={953}
                height={766}
                className={styles.heroSection__logo}
              />
            )}
          </motion.div>
        </motion.div>
        <h1
          className={styles.heroSection__title}
          dangerouslySetInnerHTML={{
            __html: siteMetadata.title,
          }}
        />
        {/* <div className={'button ' + styles.heroSection__subscribeButtonContainer}>
        <button className={'button ' + styles.heroSection__subscribeButton} onClick={handleClickEmail}>
          SUBSCRIBE
        </button>
      </div> */}
        <div className={styles.heroSection__scrollDown}>
          <div className={styles.heroSection__scrollDownMousey}>
            <div className={styles.heroSection__scrollDownScroller}></div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
export default Hero;
