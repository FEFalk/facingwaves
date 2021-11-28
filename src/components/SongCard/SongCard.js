import ClassName from 'models/classname';
import Image from 'components/Image';

import styles from './SongCard.module.scss';

const SongCard = ({ song, className }) => {
  const containerClassName = new ClassName(styles.songCard);

  function getCookie(cname) {
    console.log('getCookie ' + cname);
    return document.cookie.match('(^|;)\\s*' + cname + '\\s*=\\s*([^;]+)')?.pop() || '';
  }

  function handleClick(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    var accessToken =
      'EAAGKlFhRTrEBAE6YfOZBVxvlDKPZC00IZBPpUsK4pwUBovFSop2f5CZBUayGlf4PbtciJGYaHZCCFJGl5GmifmyKTEGdl3lMMTEZCZCI0HDKQlTedXidEZBLo6CMVRfDaeAVu1eeujQjqCHSeOZBeG2WVVMM8jw072ROcl5roY7vJ6HO9XBmDBY7o';
    var url = 'https://graph.facebook.com/v5.0/200487122108225/events?access_token=' + accessToken;
    var fbpCookie = getCookie('_fbp');
    console.log(fbpCookie);
    console.log(document.cookie);

    const postBody = {
      data: [
        {
          event_name: 'ViewContent',
          event_time: Date.now(),
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
    console.log(postBody);
    console.log(requestMetadata);

    fetch(url, requestMetadata)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

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
          <button className={styles.songCardPlay} onClick={handleClick}>
            <i className={styles.songCardPlayIcon}></i>
            <span className={styles.songCardPlayText}>Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
