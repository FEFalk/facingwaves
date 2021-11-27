import ClassName from 'models/classname';
import Image from 'components/Image';

import styles from './SongCard.module.scss';

const SongCard = ({ song, className }) => {
  const containerClassName = new ClassName(styles.songCard);

  console.log(song);
  containerClassName.addIf(className, className);
  return (
    <div className={containerClassName.toString()}>
      <div className={styles.songCardHeader}>
        {song.featuredImage && (
          <Image
            {...song.featuredImage}
            src={song.featuredImage.sourceUrl}
            dangerouslySetInnerHTML={song.featuredImage.caption}
          />
        )}
      </div>
      <div className={styles.songCardFooter}>
        <div className={styles.songCardHeadingContainer}>
          <h1
            className={styles.songCardTitle}
            dangerouslySetInnerHTML={{
              __html: song.title,
            }}
          />
          <span className={styles.songCardArtistName}>Facing Waves</span>
        </div>
        <div className={styles.songCardLinkItem}>
          <img className={styles.songCardStreamingLogo} src={'/images/spotify-logo-green.png'} />
          <div className={styles.songCardPlay}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
