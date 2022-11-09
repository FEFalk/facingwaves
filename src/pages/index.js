import { Helmet } from 'react-helmet';
import useSite from 'hooks/use-site';
import { getAllSongs } from 'lib/songs';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import SongTeaser from 'components/SongTeaser';
import EmailSignupForm from 'components/EmailSignupForm';
import { getMediaItemBySlug } from 'lib/media';
import { push } from '@socialgouv/matomo-next';
import usePageMetadata from 'hooks/use-page-metadata';
import { helmetSettingsFromMetadata } from 'lib/site';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ songs, mediaItem }) {
  const { metadata: siteMetadata = {} } = useSite();
  var post = {};

  post.og = {};
  post.og.imageUrl = `${mediaItem.sourceUrl}`;
  post.og.imageSecureUrl = mediaItem.sourceUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: siteMetadata.title,
    },
  });

  const fullTitle = siteMetadata.title + ' - Official Site';

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = fullTitle;
    metadata.og.title = fullTitle;
    metadata.twitter.title = fullTitle;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  function handleClickEmail(e) {
    e.preventDefault();
    var element = document.getElementById('email-subscribe-form');
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    push(['trackEvent', 'Startpage', 'Email button clicked']);
  }

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebsiteJsonLd siteTitle={fullTitle} />
      {/* <Header></Header> */}
      <Section className={styles.heroSection}>
        <Container>
          <h1
            className={styles.heroSection__title}
            dangerouslySetInnerHTML={{
              __html: siteMetadata.title,
            }}
          />
          <div className={'button ' + styles.heroSection__subscribeButtonContainer}>
            <button className={'button ' + styles.heroSection__subscribeButton} onClick={handleClickEmail}>
              SUBSCRIBE
            </button>
          </div>
          <div className={styles.heroSection__scrollDown}>
            <div className={styles.heroSection__scrollDownMousey}>
              <div className={styles.heroSection__scrollDownScroller}></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.releases}>
        <Container>
          <h2 className={styles.releases__title}>RELEASES</h2>
          <ul className={styles.teaserList}>
            {songs.map((song) => {
              return (
                <li key={song.slug} className={styles.teaser}>
                  <SongTeaser song={song} />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
      <EmailSignupForm mediaItem={mediaItem} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { songs } = await getAllSongs();
  const { mediaItem } = await getMediaItemBySlug('bannerbild-facing-waves-small');

  return {
    props: {
      songs,
      mediaItem,
    },
  };
}
