import { gql } from '@apollo/client';

export const QUERY_MEDIA_ITEM_BY_SLUG = gql`
  query MediaItemBySlug($slug: String) {
    mediaItemBy(slug: $slug) {
      altText
      caption
      sourceUrl
      srcSet
      sizes
      id
    }
  }
`;
