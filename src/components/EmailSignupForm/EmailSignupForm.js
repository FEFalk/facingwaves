import { push } from '@socialgouv/matomo-next';
import styles from './EmailSignupForm.module.scss';
import Image from 'components/Image';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

const EmailSignupForm = ({ mediaItem, song }) => {
  const inputRefEmail = useRef(null);
  const inputRefFName = useRef(null);
  var errorMessage = useRef(null);
  var successMessage = useRef(null);

  const [showResponse, setShowResponse] = useState(false);
  function showResponseMessage() {
    setShowResponse(true);
  }

  const [submitted, setSubmitted] = useState(false);
  function setSubmittedTrue() {
    setSubmitted(true);
  }

  const [formIsLoading, setLoading] = useState(false);
  function setLoadingState(state) {
    setLoading(state);
  }

  const subscribeUser = async (e) => {
    e.preventDefault();

    setLoadingState(true);
    var errorElement = document.getElementById('mce-error-response');
    var successElement = document.getElementById('mce-success-response');

    const emailInputElement = document.getElementById('mce-EMAIL');
    if (emailInputElement.value === '') {
      emailInputElement.style.display = '#FF555526';
      emailInputElement.style.borderColor = '#ff0000';
      errorMessage = 'Please fill out your email address.';
      errorElement.innerHTML = errorMessage;
      errorElement.style.display = 'block';
      successMessage = '';
      successElement.innerHTML = successMessage;
      successElement.style.display = 'none';
      showResponseMessage();
      setLoadingState(false);
      return;
    }
    // this is where your mailchimp request is made

    const res = await fetch(window.location.origin + '/api/subscribeUser', {
      body: JSON.stringify({
        email: inputRefEmail.current.value,
        fname: inputRefFName.current.value,
      }),

      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
    });

    setLoadingState(false);

    if (res.status >= 400) {
      const responseJSON = await res.json();
      errorMessage = responseJSON.error;
      errorElement.innerHTML = errorMessage;
      errorElement.style.display = 'block';
      successMessage = '';
      successElement.innerHTML = successMessage;
      successElement.style.display = 'none';
      showResponseMessage();
    } else {
      errorMessage = '';
      errorElement.innerHTML = errorMessage;
      errorElement.style.display = 'none';
      successMessage =
        'Thank you for subscribing! ❤️ You will be the first to find out about new releases and other fun stuff!';
      successElement.innerHTML = successMessage;
      successElement.style.display = 'block';

      push(['trackEvent', song.title, 'Email Signup']);

      setSubmittedTrue();
      showResponseMessage();
    }
  };

  function handleClose(e) {
    e.preventDefault();
    var element = document.getElementById('email-subscribe-form');
    element.style.opacity = 0;
    element.style.pointerEvents = 'none';
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        handleClose(e);
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  return (
    <div
      id="email-subscribe-form"
      className={
        styles.emailSignupForm +
        ' ' +
        (submitted ? styles.emailSignupFormSubmitted : '') +
        (formIsLoading ? styles.emailSignupFormLoading : '')
      }
    >
      <div className={styles.emailSignupForm__backdrop} onClick={handleClose}></div>
      <div id="mc_embed_signup" className={styles.emailSignupForm__content}>
        <Image
          className={styles.emailSignupForm__image}
          src={mediaItem.sourceUrl}
          srcSet={mediaItem.srcSet}
          dangerouslySetInnerHTML={mediaItem.caption}
        />
        <form
          onSubmit={subscribeUser}
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className={'validate ' + styles.emailSignupForm__form}
        >
          <div id="mc_embed_signup_scroll">
            <h2 className={'validate ' + styles.emailSignupForm__heading}>Join us</h2>
            <h2
              className={'validate ' + styles.emailSignupForm__heading + ' ' + styles.emailSignupForm__headingSuccess}
            >
              Success!
            </h2>
            <p className={'mc-field-group ' + styles.emailSignupForm__preamble}>
              Get to know us better and be the first to find out about our new releases, videos, events and more by
              joining our email subscription below!
            </p>
            <div className={'mc-field-group ' + styles.emailSignupForm__fieldGroup}>
              <label htmlFor="mce-EMAIL" className="sr-only">
                Email Address: <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                defaultValue=""
                name="EMAIL"
                className={'required email ' + styles.emailSignupForm__input}
                ref={inputRefEmail}
                id="mce-EMAIL"
                placeholder="Enter your email *"
                required=""
              />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text" />
            </div>
            <div className={'mc-field-group ' + styles.emailSignupForm__fieldGroup}>
              <label htmlFor="mce-FNAME" className="sr-only">
                First Name{' '}
              </label>
              <input
                type="text"
                defaultValue=""
                name="FNAME"
                className={styles.emailSignupForm__input}
                ref={inputRefFName}
                id="mce-FNAME"
                placeholder="Enter your first name"
                autoComplete="given-name"
              />
              <span id="mce-FNAME-HELPERTEXT" className="helper_text" />
            </div>
            <div id="mce-responses" className="clear foot" style={{ display: showResponse ? 'block' : 'none' }}>
              <p className={styles.emailSignupForm__error} id="mce-error-response"></p>
              <p className={styles.emailSignupForm__success} id="mce-success-response"></p>
            </div>
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="b_218aedeb7cbdf9c80e2c996fe_9e17ac62bd" tabIndex={-1} defaultValue="" />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={'button ' + styles.emailSignupForm__submit}
                />
              </div>
            </div>
            <button className={'button ' + styles.emailSignupForm__closeBigButton} onClick={handleClose}>
              CLOSE
            </button>
          </div>
          <div className={'lds-ring ' + styles.emailSignupForm__loadingRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </form>
        <button className={styles.emailSignupForm__close} onClick={handleClose}></button>
      </div>
    </div>
  );
};

export default EmailSignupForm;
