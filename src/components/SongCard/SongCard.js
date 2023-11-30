/* eslint-disable no-useless-escape */
import ClassName from 'models/classname';
import Image from 'components/Image';
// import { push } from '@socialgouv/matomo-next';
import styles from './SongCard.module.scss';
import { convertClick } from 'lib/conversion';

const SongCard = ({ song, className }) => {
  const containerClassName = new ClassName(styles.songCard);

  const handleClickStream = async (e, streamUrl) => {
    e.preventDefault();
    convertClick(song, streamUrl);
  };
  // function handleClickEmail(e) {
  //   e.preventDefault();
  //   var element = document.getElementById('email-subscribe-form');
  //   element.style.opacity = 1;
  //   element.style.pointerEvents = 'all';
  //   push(['trackEvent', song.title, 'Email button clicked']);
  // }

  containerClassName.addIf(className, className);
  return (
    <div className={containerClassName.toString()}>
      <div className={styles.songCardHeader} onClick={(event) => handleClickStream(event, song.song.spotifyUrl)}>
        {song.song.coverArt && (
          <Image
            {...song.song.coverArt}
            src={song.song.coverArt.sourceUrl}
            width={650}
            height={650}
            dangerouslySetInnerHTML={song.song.coverArt.caption}
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
          <span
            className={styles.songCardArtistName}
            dangerouslySetInnerHTML={{
              __html: song.song.artist,
            }}
          />
          {/* <div className={styles.songCardCaretBorder}></div>
          <div className={styles.songCardCaret}></div> */}
        </div>
        <button
          className={styles.songCardLinkItem + ' ' + styles.songCardLinkItemSpotify}
          id={'play-spotify'}
          onClick={(event) => handleClickStream(event, song.song.spotifyUrl)}
        >
          <Image
            src={'/images/spotify-logo-green_small.png'}
            className={styles.songCardStreamingLogo}
            width={120}
            height={38}
          />
          <div className={styles.songCardPlay}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </div>
        </button>
        {/* <button
          className={styles.songCardLinkItem + ' ' + styles.songCardLinkItemAppleMusic}
          id={'play-apple-music'}
          onClick={(event) => handleClickStream(event, song.song.appleMusicUrl)}
        >
          <Image
            src={'/images/apple-music-logo_small.png'}
            className={styles.songCardAppleMusicLogo}
            width={144}
            height={33}
          />
          <div className={styles.songCardPlay}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </div>
        </button>
        {song.song.youtubeUrl && (
          <button
            className={styles.songCardLinkItem + ' ' + styles.songCardLinkItemYouTube}
            id={'play-youtube'}
            onClick={(event) => handleClickStream(event, song.song.youtubeUrl)}
          >
            <Image
              src={'/images/youtube-logo_small.png'}
              className={styles.songCardYouTubeLogo}
              width={212}
              height={47}
            />
            <div className={styles.songCardPlay}>
              <i className={styles.songCardPlayIcon}></i>
              <span className={styles.songCardPlayText}>Play</span>
            </div>
          </button>
        )} 
        <button className={styles.songCardLinkItem} id={'email-subscribe'} onClick={handleClickEmail}>
          <div className={styles.songCardLinkItem__nameContainer}>
            <Image src={'/images/gmail.png'} className={styles.songCardStreamingLogo} width={48} height={48} />
            <span className={styles.songCardGmailText}>Email</span>
          </div>
          <div className={styles.songCardPlay}>
            <span className={styles.songCardPlayText}>Subscribe</span>
          </div>
        </button>*/}
      </div>
    </div>
  );
};

export default SongCard;
