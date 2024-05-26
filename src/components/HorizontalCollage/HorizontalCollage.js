import ClassName from 'models/classname';
import styles from './HorizontalCollage.module.scss';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HorizontalCollage = ({ videos, className }) => {
  const horizontalCollageClassName = new ClassName(styles.horizontalCollage);

  horizontalCollageClassName.addIf(className, className);

  const collageContainerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: collageContainerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, mass: 0.27, stiffness: 55 });

  const x = useTransform(smoothProgress, [0.1, 1], ['0%', '-100%']);
  const xTransformReel = useTransform(smoothProgress, [0.1, 1], ['0%', '-1000%']);
  const opacityCollage = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // const isCollageInView = useInView(collageContainerRef);

  return (
    <section className={styles.horizontalCollage} ref={collageContainerRef}>
      <motion.div className={styles.horizontalCollage__container} style={{ opacity: opacityCollage }}>
        <motion.h2 className={styles.horizontalCollage__title} style={{ x, opacity: opacityCollage }}>
          WELCOME TO OUR WORLD OF MUSIC
        </motion.h2>
        <motion.div className={styles.horizontalCollage__reelList}>
          {videos.map((video, index) => {
            return (
              <div key={video.slug} className={styles.horizontalCollage__reelContainer}>
                <motion.video
                  className={`${styles.horizontalCollage__reel} ${styles[`horizontalCollage__reel--${index}`]}`}
                  src={video.mediaItemUrl}
                  autoPlay
                  loop
                  muted
                  style={{ x: xTransformReel }}
                />
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};
export default HorizontalCollage;
