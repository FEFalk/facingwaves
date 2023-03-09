/* eslint-disable no-useless-escape */
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

  async function getUserData() {
    const response = await fetch(window.location.origin + '/api/user');
    const data = await response.json();
    return data;
  }

  const handleClickStream = async (e, streamUrl) => {
    e.preventDefault();
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('200487122108225'); // facebookPixelId
        ReactPixel.track('ViewContent');
      });

    var fbpCookie = getCookie('_fbp');
    var fbcCookie = getCookie('_fbc') || null;
    var url = 'https://graph.facebook.com/v13.0/200487122108225/events?access_token=' + FB_ACCESS_TOKEN;
    var requestMetadata = null;
    await getUserData().then((data) => {
      if (!fbcCookie && window.location.search.includes('fbclid=')) {
        fbcCookie = 'fb.1.' + +new Date() + '.' + window.location.search.split('fbclid=')[1];
      }
      if (fbpCookie != null && fbpCookie.length > 0) {
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
        requestMetadata = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        };
      }
    });
    if (requestMetadata != null) {
      await fetch(url, requestMetadata).then((res) => res.json());
    }
    push(['trackEvent', song.title, 'Spotify conversion']);

    const mobileAndTabletCheck = () => {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };

    if (mobileAndTabletCheck() == true) {
      window.location.href = streamUrl;
    } else {
      window.open(streamUrl, '_blank');
    }
  };
  function handleClickEmail(e) {
    e.preventDefault();
    var element = document.getElementById('email-subscribe-form');
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    push(['trackEvent', song.title, 'Email button clicked']);
  }

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
          <div className={styles.songCardCaretBorder}></div>
          <div className={styles.songCardCaret}></div>
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
        <button
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
        </button>
      </div>
    </div>
  );
};

export default SongCard;
