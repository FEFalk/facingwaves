import { gql } from '@apollo/client';

export const QUERY_ALL_SONGS = gql`
  query AllSongs {
    songs(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          id
          content
          date
          modified
          databaseId
          title
          slug
          song {
            releaseDate
            coverArt {
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
            }
            spotifyUrl
            appleMusicUrl
          }
        }
      }
    }
  }
`;

export const QUERY_SONG_BY_SLUG = gql`
  query SongBySlug($slug: ID!) {
    song(id: $slug, idType: SLUG) {
      id
      content
      date
      modified
      databaseId
      title
      slug
      song {
        releaseDate
        coverArt {
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
        spotifyUrl
        appleMusicUrl
      }
    }
  }
`;

export const QUERY_SONG_SEO_BY_SLUG = gql`
  query SongSEOBySlug($slug: ID!) {
    song(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
