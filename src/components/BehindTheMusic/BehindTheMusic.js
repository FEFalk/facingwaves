// import { push } from '@socialgouv/matomo-next';
import styles from './BehindTheMusic.module.scss';
import Image from 'components/Image';
import { useState } from 'react';
import { convertClick } from 'lib/conversion';

const BehindTheMusic = ({ mediaItem, song }) => {
  // Initialize the state to false, as the content is not expanded initially
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickBehindTheMusic = () => {
    // Toggle the isExpanded state between true and false
    setIsExpanded(true);
    var scrollDiv = document.getElementById('behind-the-music').offsetTop;
    setTimeout(function () {
      window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
    }, 500);
  };

  const handleClickStream = async (e, streamUrl) => {
    convertClick(song, streamUrl);
  };

  return (
    <div
      id="behind-the-music"
      className={`${styles.behindTheMusic} ${isExpanded ? styles.expanded : ''}`}
      onClick={handleClickBehindTheMusic}
    >
      <div className={styles.behindTheMusic__buttonContainer}>
        <div className={styles.behindTheMusic__button}>
          {/* <div className={styles.behindTheMusic__buttonLogo}>
            <Image src={'/images/gmail.png'} className={styles.songCardStreamingLogo} width={48} height={48} />
          </div> */}
          <div className={styles.behindTheMusic__buttonText}>
            <div className={styles.behindTheMusic__headingImage}>
              <Image
                className={styles.emailSignupForm__image}
                src={mediaItem.sourceUrl}
                srcSet={mediaItem.srcSet}
                width={600}
                height={600}
              />
            </div>
            <span className={styles.behindTheMusic__heading}>About the song</span>
            {song.song.behindTheMusic && (
              <div
                className={styles.behindTheMusic__lyrics}
                dangerouslySetInnerHTML={{
                  __html: song.song.behindTheMusic,
                }}
              />
            )}
            <button
              className={styles.behindTheMusic__link}
              id={'play-spotify'}
              onClick={(event) => handleClickStream(event, song.song.spotifyUrl)}
            >
              <Image
                src={'/images/spotify-logo-green_small.png'}
                className={styles.songCardStreamingLogo}
                width={120}
                height={38}
              />
              <div className={styles.behindTheMusic__linkPlay}>
                <i className={styles.behindTheMusic__linkIcon}></i>
                <span className={styles.behindTheMusic__linkText}>Play</span>
              </div>
            </button>
          </div>
        </div>
        <div className={styles.behindTheMusic__expand}>
          <i className={styles.behindTheMusic__expandIcon}></i>
        </div>
      </div>
    </div>
  );
};

export default BehindTheMusic;
