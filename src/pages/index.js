import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { getAllSongs } from 'lib/songs';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';
import SongTeaser from 'components/SongTeaser';
import EmailSignupForm from 'components/EmailSignupForm';
import { getMediaItemBySlug } from 'lib/media';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ songs, posts, pagination, mediaItem }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      {/* <Header></Header> */}
      <Section className={styles.heroSection}>
        <Container>
          <h1 className={styles.heroSection__title}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
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
  const { posts, pagination } = await getPaginatedPosts();
  const { songs } = await getAllSongs();
  const { mediaItem } = await getMediaItemBySlug("bannerbild-facing-waves-small");

  return {
    props: {
      songs,
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
      mediaItem,
    },
  };
}
