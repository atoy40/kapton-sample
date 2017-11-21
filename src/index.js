import ApolloClient, { toIdValue, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import Kapton, { createKaptonMixin } from 'kapton';
import gql from 'graphql-tag';

// define unique id of User type.
const dataIdFromObject = (result) => {
  if (result.__typename === "User") {
    return result.__typename+'_'+result.id;
  }
  return null;
};

// Create regular NetworkInterface by using apollo-client's API:
// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
const networkInterface = createNetworkInterface({
  uri: '__SIMPLE_API_ENDPOINT__',
 });

// Create WebSocket client
// __SUBSCRIPTIONS_API_ENDPOINT__ looks similar to: `wss://subscriptions.graph.cool/v1/<PROJECT_ID>`
const wsClient = new SubscriptionClient('__SUBSCRIPTIONS_API_ENDPOINT_', {
  reconnect: true,
  timeout: 20000
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
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

const USER_CHANGES = gql`
  subscription userChanges {
    User (filter: { mutation_in: [CREATED, UPDATED, DELETED] }){
      mutation
      previousValues {
        id
      }
      node {
        id
        lastname
        firstname
        age
      }
    }
  }
`;

// Exported variables are accessible through the "App" (eg App.graphql) global variable into the browser
export {
  apolloClient,
  graphql,
  createKaptonMixin,
  USERS_LIST,
  SINGLE_USER,
  UPDATE_USER,
  ADD_USER,
  DEL_USER,
  USER_CHANGES,
};
