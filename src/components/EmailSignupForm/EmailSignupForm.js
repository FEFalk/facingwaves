import ClassName from 'models/classname';
import { push } from '@socialgouv/matomo-next';
import styles from './EmailSignupForm.module.scss';
import Image from 'components/Image';
import { useEffect } from 'react';

const EmailSignupForm = ({ mediaItem, song }) => {
  const containerClassName = new ClassName(styles.emailSignupForm);

  function handleClick(e) {
    push(['trackEvent', song.title, 'Email Signup']);
    var element = document.getElementById("email-subscribe-form");
    element.style.opacity = 0;
    element.style.pointerEvents = "none";
  };

  function handleClose(e) {
    e.preventDefault();
    var element = document.getElementById("email-subscribe-form");
    element.style.opacity = 0;
    element.style.pointerEvents = "none";
  };

  useEffect(() => {
    const close = (e) => {
      if(e.key === "Escape"){
        handleClose(e);
      }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  },[])

  return (
    <div id="email-subscribe-form" className={styles.emailSignupForm}>
      <div className={styles.emailSignupForm__backdrop} onClick={handleClose}>

      </div>
      <div id="mc_embed_signup" className={styles.emailSignupForm__content}>
        <Image
              className={styles.emailSignupForm__image}
              src={mediaItem.sourceUrl}
              srcSet={mediaItem.srcSet}
              dangerouslySetInnerHTML={mediaItem.caption}
            />
        <form
          action="https://facingwavesmusic.us21.list-manage.com/subscribe/post?u=218aedeb7cbdf9c80e2c996fe&id=9e17ac62bd&f_id=0021c6e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className={"validate " + styles.emailSignupForm__form}
          target="_blank">
          <div id="mc_embed_signup_scroll">
            <h2 className={"validate " + styles.emailSignupForm__heading}>Join us</h2>
            <p>
              Be the first to find out about new music, videos and more from us by joining our email subscription list below!
            </p>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL" className='sr-only'>
                Email Address: <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                defaultValue=""
                name="EMAIL"
                className={"required email " + styles.emailSignupForm__input}
                id="mce-EMAIL"
                placeholder="Enter your email *"
                required=""
              />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text" />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME" className='sr-only'>First Name </label>
              <input type="text" defaultValue="" name="FNAME" className={styles.emailSignupForm__input} id="mce-FNAME" placeholder="Enter your first name" autoComplete="given-name" />
              <span id="mce-FNAME-HELPERTEXT" className="helper_text" />
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              />
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              />
            </div>
            <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
              <input
                type="text"
                name="b_218aedeb7cbdf9c80e2c996fe_9e17ac62bd"
                tabIndex={-1}
                defaultValue=""
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={"button " + styles.emailSignupForm__submit}
                  onClick={handleClick}/>
              </div>
            </div>
          </div>
        </form>
        <button className={styles.emailSignupForm__close} onClick={handleClose}>
        </button>
      </div>
    </div>
  );
};

export default EmailSignupForm;
