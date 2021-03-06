import ClassName from 'models/classname';
import Image from 'components/Image';
import { push } from '@socialgouv/matomo-next';
import styles from './SongCard.module.scss';

const SongCard = ({ song, className }) => {
  const containerClassName = new ClassName(styles.songCard);
  const FB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_FB_ACCESS_TOKEN;

  function getCookie(cname) {
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
  }

  const getUserData = async () => {
    const response = await fetch(window.location.origin + '/api/user');
    const data = await response.json();
    return data;
  };

  function handleClick(e) {
    e.preventDefault();
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('200487122108225'); // facebookPixelId
        ReactPixel.track('ViewContent');
      });

    var fbpCookie = getCookie('_fbp');
    var fbcCookie = getCookie('_fbc') || null;
    getUserData().then((data) => {
      if (!fbcCookie && window.location.search.includes('fbclid=')) {
        fbcCookie = 'fb.1.' + +new Date() + '.' + window.location.search.split('fbclid=')[1];
      }
      if (fbpCookie != null && fbpCookie.length > 0) {
        var url = 'https://graph.facebook.com/v13.0/200487122108225/events?access_token=' + FB_ACCESS_TOKEN;
        const postBody = {
          data: [
            {
              event_name: 'ViewContent',
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'website',
              event_source_url: window.location.href,
              user_data: {
                fbp: fbpCookie,
                fbc: fbcCookie,
                client_user_agent: navigator.userAgent,
                client_ip_address: data.ip,
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
    });
  }
  containerClassName.addIf(className, className);
  return (
    <button className={containerClassName.toString()} onClick={handleClick}>
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
          <div className={styles.songCardCaretBorder}></div>
          <div className={styles.songCardCaret}></div>
        </div>
        <div className={styles.songCardLinkItem}>
          <img className={styles.songCardStreamingLogo} src={'/images/spotify-logo-green.png'} />
          <div className={styles.songCardPlay}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SongCard;
