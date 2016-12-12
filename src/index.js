import ApolloClient, { toIdValue } from 'apollo-client';
import Kapton from 'kapton';
import gql from 'graphql-tag';
import { createFakeNetworkInterface } from './network';

// define unique id of User type.
const dataIdFromObject = (result) => {
  if (result.__typename === "User") {
    return result.__typename+'_'+result.uid;
  }
  return null;
};

// Create the apollo client
const apolloClient = new ApolloClient({
  // In a normal app, you'll probably use createNetworkInterface instead.
  // This demo app use an in-client graphql enpoint and simulate latency
  networkInterface: createFakeNetworkInterface({ latency: 1000 }),
  dataIdFromObject,
  customResolvers: {
    Query: {
      user: (_, args) => toIdValue(dataIdFromObject({ __typename: 'User', uid: args['uid'] })),
    }
  }
});

// Get a Kapton behavior "factory"
const graphql = Kapton({apolloClient});

// Queries and mutations

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

const SINGLE_USER = gql`
  query usersList($uid: String!) {
    user(uid: $uid) {
      uid
      lastname
      firstname
      age
    }
  }
`;

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

const UPDATE_USER = gql`
  mutation updateUser($uid: String!, $user: UserInput!) {
    updateUser(uid: $uid, user: $user) {
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

export { graphql, USERS_LIST, SINGLE_USER, UPDATE_USER, ADD_USER, DEL_USER };
