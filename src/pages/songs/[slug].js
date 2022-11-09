import { Helmet } from 'react-helmet';

import { getSongBySlug, getAllSongs } from 'lib/songs';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import SongCard from 'components/SongCard';

import styles from 'styles/pages/Song.module.scss';
import EmailSignupForm from 'components/EmailSignupForm';
import { getMediaItemBySlug } from 'lib/media';

export default function Song({ post, mediaItem }) {
  const { title, description } = post;

  const { metadata: siteMetadata = {} } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${post.featuredImage.sourceUrl}`;
  post.og.imageSecureUrl = post.featuredImage.sourceUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

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

      {post.featuredImage && (
        <div className={styles.songBackgroundContainer}>
          {/* <div className={styles.songBackgroundImage} style={{backgroundImage: "url(" + post.featuredImage.sourceUrl + ")"}}> */}
          <img
            className={styles.songBackgroundImage}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            src={post.featuredImage.sourceUrl}
            alt={post.featuredImage.alt || ''}
            srcSet={post.featuredImage.srcSet}
            sizes={'(max-width: 400px) 300px, 700px'}
          />
          <div className={styles.songBackgroundBackdrop}></div>
        </div>
        // </div>
      )}
      <div className={styles.songCardContainer}>
        <SongCard song={post} />
      </div>
      <EmailSignupForm mediaItem={mediaItem} song={post} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getSongBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { mediaItem } = await getMediaItemBySlug('bannerbild-facing-waves-small');

  return {
    props: {
      post,
      socialImage,
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
