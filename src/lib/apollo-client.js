import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

import { removeLastTrailingSlash } from 'lib/util';

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const retryLink = new RetryLink({
    attempts: {
      max: 5,
      // eslint-disable-next-line no-unused-vars
      retryIf: (error, _operation) => {
        // Determine if the error is retryable or not
        return error.statusCode > 201 || error.message.includes('Retry');
      },
    },
  });
  return new ApolloClient({
    link: retryLink.concat(
      new HttpLink({
        uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
      })
    ),
    cache: new InMemoryCache(),
  });
}
