import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getSongBySlug, getAllSongs, songPathBySlug } from 'lib/songs';
import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import SongCard from 'components/SongCard';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Song.module.scss';

export default function Song({ post, socialImage }) {
  const {
    title,
    metaTitle,
    description,
    content,
    date,
    author,
    featuredImage,
  } = post;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
  };

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout hideHeaderFooter={true}>
      <Helmet {...helmetSettings} />

      {post.featuredImage &&
        <div className={styles.songBackgroundContainer}>
          {/* <div className={styles.songBackgroundImage} style={{backgroundImage: "url(" + post.featuredImage.sourceUrl + ")"}}> */}
            <img className={styles.songBackgroundImage} width={post.featuredImage.width} height={post.featuredImage.height} src={post.featuredImage.src} alt={post.featuredImage.alt || ''} srcSet={post.featuredImage.srcSet} sizes={'(max-width: 400px) 300px, 700px'} />
            <div className={styles.songBackgroundBackdrop}></div>
          </div>
        // </div>
      }

      <SongCard 
        song={post}
      />

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getSongBySlug(params?.slug);

  const socialImage = `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`;

  const { databaseId: postId } = post;

  return {
    props: {
      post,
      socialImage,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllSongs();

  const paths = posts
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
