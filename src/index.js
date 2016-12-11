import ApolloClient from 'apollo-client';
import Kapton from 'kapton';
import gql from 'graphql-tag';
import { createFakeNetworkInterface } from './network';

// Create the apollo client
const apolloClient = new ApolloClient({
  // In a normal app, you'll probably use createNetworkInterface instead.
  // This demo app use an in-client graphql enpoint
  networkInterface: createFakeNetworkInterface({ latency: 1000 }),
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
  query usersList {
    users {
      uid
      lastname
      firstname
      age
    }
  }
`;

// Get a mutation document
const ADD_USER = gql`
  mutation addUser($user: UserInput!) {
    addUser(user: $user) {
      uid
      lastname
      firstname
      age
    }
  }
`;

const DEL_USER = gql`
  mutation delUser($uid: String!) {
    delUser(uid: $uid) {
      uid
    }
  }
`;

export { graphql, USERS_LIST, ADD_USER, DEL_USER };
