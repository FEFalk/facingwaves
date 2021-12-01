import ClassName from 'models/classname';
import Image from 'components/Image';
import { push } from '@socialgouv/matomo-next';

import styles from './SongCard.module.scss';

const SongCard = ({ song, className }) => {
  const containerClassName = new ClassName(styles.songCard);

  function getCookie(cname) {
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
  }

  function handleClick(e) {
    e.preventDefault();
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('200487122108225'); // facebookPixelId
        ReactPixel.track('ViewContent');
      });

    var fbpCookie = getCookie('_fbp');
    if (fbpCookie != null && fbpCookie.length > 0) {
      var accessToken =
        'EAAGKlFhRTrEBAE6YfOZBVxvlDKPZC00IZBPpUsK4pwUBovFSop2f5CZBUayGlf4PbtciJGYaHZCCFJGl5GmifmyKTEGdl3lMMTEZCZCI0HDKQlTedXidEZBLo6CMVRfDaeAVu1eeujQjqCHSeOZBeG2WVVMM8jw072ROcl5roY7vJ6HO9XBmDBY7o';
      var url = 'https://graph.facebook.com/v5.0/200487122108225/events?access_token=' + accessToken;
      const postBody = {
        data: [
          {
            event_name: 'ViewContent',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: window.location.href,
            user_data: {
              fbp: fbpCookie,
            },
          },
        ],
      };
      const requestMetadata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      };
      fetch(url, requestMetadata).then((res) => res.json());
    }

    push(['trackEvent', song.title, 'Spotify conversion']);

    window.location.href = song.song.spotifyUrl;
  }
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
        <button className={styles.songCardLinkItem} onClick={handleClick}>
          <img className={styles.songCardStreamingLogo} src={'/images/spotify-logo-green.png'} />
          <div className={styles.songCardPlay}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SongCard;
