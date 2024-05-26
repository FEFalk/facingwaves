import { Helmet } from 'react-helmet';
import useSite from 'hooks/use-site';
import { getAllSongs } from 'lib/songs';
import { getHomePage } from 'lib/pages';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import EmailSignupForm from 'components/EmailSignupForm';
import Hero from 'components/Hero';
import Releases from 'components/Releases';
import { getMediaItemBySlug } from 'lib/media';
// import { push } from '@socialgouv/matomo-next';
import usePageMetadata from 'hooks/use-page-metadata';
import { helmetSettingsFromMetadata } from 'lib/site';
import HorizontalCollage from 'components/HorizontalCollage';
// import { easeIn, easeInOut, motion, useInView, useScroll, useTransform } from 'framer-motion';

// import styles from 'styles/pages/Home.module.scss';

export default function Home({ homePage, songs, mediaItem }) {
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

  // function handleClickEmail(e) {
  //   e.preventDefault();
  //   var element = document.getElementById('email-subscribe-form');
  //   element.style.opacity = 1;
  //   element.style.pointerEvents = 'all';
  //   push(['trackEvent', 'Startpage', 'Email button clicked']);
  // }

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebsiteJsonLd siteTitle={fullTitle} />
      {/* <Header></Header> */}

      <Hero homePage={homePage} />

      <HorizontalCollage videos={homePage.reels} />

      <Releases songs={songs} />

      <EmailSignupForm mediaItem={mediaItem} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { homePage } = await getHomePage();
  const { songs } = await getAllSongs();
  const { mediaItem } = await getMediaItemBySlug('bannerwide_smaller');

  return {
    props: {
      homePage,
      songs,
      mediaItem,
    },
  };
}
