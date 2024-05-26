import ClassName from 'models/classname';
import styles from './Releases.module.scss';
import SongTeaser from 'components/SongTeaser';

import { easeIn, easeInOut, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Releases = ({ songs, className }) => {
  const releasesClassName = new ClassName(styles.releases);

  releasesClassName.addIf(className, className);

  const releasesContainerRef = useRef();

  // const { scrollYProgress } = useScroll({ releasesContainerRef });
  const isReleasesInView = useInView(releasesContainerRef);

  return (
    <section className={styles.releases}>
      <motion.div
        className={styles.releases__container}
        ref={releasesContainerRef}
        initial={{ x: '-100px', opacity: 0 }}
        animate={isReleasesInView ? { x: '0', opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        delay={{}}
      >
        <h2 className={styles.releases__title}>RELEASES</h2>
        <ul className={styles.teaserList}>
          {songs.map((song) => {
            return (
              <li key={song.slug} className={styles.teaser}>
                <SongTeaser song={song} />
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
};
export default Releases;
