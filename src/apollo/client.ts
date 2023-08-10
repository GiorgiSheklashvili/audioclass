import { ApolloClient, InMemoryCache, HttpLink  } from '@apollo/client';
import { magentoConfig } from '../../magento.config';
import possibleTypes from './data/possibleTypes.json';

export const apolloClient = new ApolloClient({
  uri: `${magentoConfig.url}/graphql`,
  cache: new InMemoryCache({
    possibleTypes,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});