import { Helmet } from 'react-helmet';

import { getSongBySlug, getAllSongs } from 'lib/songs';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import SongCard from 'components/SongCard';

import styles from 'styles/pages/Song.module.scss';
// import EmailSignupForm from 'components/EmailSignupForm';
import { getMediaItemBySlug } from 'lib/media';
import BehindTheMusic from 'components/BehindTheMusic';

export default function Song({ post, mediaItem }) {
  const { title, description } = post;

  const { metadata: siteMetadata = {} } = useSite();

  if (!post.og) {
    post.og = {};
  }
  if (post.song.coverArt != null) {
    post.og.imageUrl = `${post.song.coverArt.sourceUrl}`;
    post.og.imageSecureUrl = post.song.coverArt.sourceUrl;
    post.og.imageWidth = 2000;
    post.og.imageHeight = 1000;
  }

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: siteMetadata.title,
      description: description || post.og?.description || `Listen to ${title} by Facing Waves`,
    },
  });

  var fullTitle = title + ' | ' + siteMetadata.title;

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = fullTitle;
    metadata.og.title = fullTitle;
    metadata.twitter.title = fullTitle;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout hideHeaderFooter={true}>
      <Helmet {...helmetSettings} />

      {post.song.coverArt && (
        <div className={styles.songBackgroundContainer}>
          {/* <div className={styles.songBackgroundImage} style={{backgroundImage: "url(" + post.featuredImage.sourceUrl + ")"}}> */}
          <img
            className={styles.songBackgroundImage}
            width={post.song.coverArt.width}
            height={post.song.coverArt.height}
            src={post.song.coverArt.sourceUrl}
            alt={post.song.coverArt.alt || ''}
            srcSet={post.song.coverArt.srcSet}
            sizes={'(max-width: 400px) 300px, 700px'}
          />
          <div className={styles.songBackgroundBackdrop}></div>
        </div>
        // </div>
      )}
      <div className={styles.songCardContainer}>
        <SongCard song={post} />
      </div>
      {/* <EmailSignupForm mediaItem={mediaItem} song={post} /> */}
      <BehindTheMusic mediaItem={mediaItem} song={post} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getSongBySlug(params?.slug);
  // const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { mediaItem } = await getMediaItemBySlug('bannerwide_smaller');

  return {
    props: {
      post,
      mediaItem,
    },
  };
}

export async function getStaticPaths() {
  const { songs } = await getAllSongs();

  const paths = songs
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
