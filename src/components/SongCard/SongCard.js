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
        'EAAHbQEkFYzwBAPMZA4S7XfKg01bfZAcCncbG6fsQPMSpjsxNcBelgBdBqDu3ngrOgLj2B7tihybQPbvtF6ycclWZCPzZBNOHEn2FVMZApbLpvIHOPOpDjonv7sZCZCZBjzWyXl0fjipbHLSb1CqXeuMtCZAtU4IqdknZCpSk6ZAqVzHzZBfGZClgwhV9o0gIsSf1JhhrkEozAJHbgZBbdosoMNKd8fnIlQEhI47ZCHsrKZCcVZCvhZCwZDZD';
      var url = 'https://graph.facebook.com/v13.0/200487122108225/events?access_token=' + accessToken;
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
        test_event_code: 'TEST8662',
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
