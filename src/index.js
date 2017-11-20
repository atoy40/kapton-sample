import ApolloClient, { toIdValue, createNetworkInterface } from 'apollo-client';
import Kapton, { createKaptonMixin } from 'kapton';
import gql from 'graphql-tag';

const GRAPHQL_ENDPOINT = "https://api.graph.cool/simple/v1/cja83n3bb2k1o01442pm6obrw";

// define unique id of User type.
const dataIdFromObject = (result) => {
  if (result.__typename === "User") {
    return result.__typename+'_'+result.id;
  }
  return null;
};

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: GRAPHQL_ENDPOINT }),
  dataIdFromObject,
  customResolvers: {
    Query: {
      User: (_, args) => toIdValue(dataIdFromObject({ __typename: 'User', id: args['id'] })),
    }
  }
});

// Get a Kapton behavior "factory"
const graphql = Kapton({apolloClient});

// Queries and mutations

const USERS_LIST = gql`
  query usersList {
    allUsers {
      id
      lastname
      firstname
      age
    }
  }
`;

const SINGLE_USER = gql`
  query singleUser($id: ID!) {
    User(id: $id) {
      id
      lastname
      firstname
      age
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($firstname: String!, $lastname: String!, $age: Int) {
    createUser(firstname: $firstname, lastname: $lastname, age: $age) {
      id
      lastname
      firstname
      age
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $firstname: String, $lastname: String, $age: Int) {
    updateUser(id: $id, firstname: $firstname, lastname: $lastname, age: $age) {
      id
      lastname
      firstname
      age
    }
  }
`;

const DEL_USER = gql`
  mutation delUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export { graphql, createKaptonMixin, USERS_LIST, SINGLE_USER, UPDATE_USER, ADD_USER, DEL_USER };
