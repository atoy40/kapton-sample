import ApolloClient from 'apollo-client';
import Kapton from 'kapton';
import gql from 'graphql-tag';
import { createFakeNetworkInterface } from './network';

// Create the apollo client
const apolloClient = new ApolloClient({
  // In a normal app, you'll probably use createNetworkInterface instead.
  // This demo app use an in-client graphql enpoint
  networkInterface: createFakeNetworkInterface({ latency: 2000 }),
  // define unique id of User type.
  dataIdFromObject: (result) => {
    if (result.__typename === "User") {
      return result.__typename+'_'+result.uid;
    }
    return null;
  }
});

// Get a behavior "factory"
const graphql = Kapton({apolloClient});

// Get a query document
const USERS_LIST = gql`
  query myQuery {
    users {
      uid
      lastname
    }
  }
`;

// Get a mutation document
const ADD_USER = gql`
  mutation myMutation($uid: String!, $lastname: String!) {
    addUser(uid: $uid, lastname: $lastname) {
      uid
      lastname
    }
  }
`;

export { graphql, USERS_LIST, ADD_USER };
