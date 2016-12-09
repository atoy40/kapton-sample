import ApolloClient from 'apollo-client';
import Kapton from 'kapton';
import gql from 'graphql-tag';
import { createFakeNetworkInterface } from './network';

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createFakeNetworkInterface(),
  // define unique id of User's
  dataIdFromObject: (result) => {
    if (result.__typename === "User") {
      return result.__typename+'_'+result.uid;
    }
    return null;
  }
});

// get a behavior "factory"
const graphql = Kapton({apolloClient});

// get a query document
const USERS_LIST = gql`
  query myQuery {
    users {
      uid
      lastname
    }
  }
`;

// get a mutation document
const ADD_USER = gql`
  mutation myMutation($uid: String!, $lastname: String!) {
    addUser(uid: $uid, lastname: $lastname) {
      uid
      lastname
    }
  }
`;

export { graphql, USERS_LIST, ADD_USER };
