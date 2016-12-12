import { makeExecutableSchema } from 'graphql-tools';
import Users from './data';

const schemaDefinition = `
  type User {
    uid: String!
    lastname: String!
    firstname: String
    age: Int
  }

  type RootQuery {
    users : [User!]
    user(uid: String) : User
  }

  input UserInput {
    lastname: String!
    firstname: String
    age: Int
  }

  type RootMutation {
    addUser(user: UserInput!) : User
    updateUser(uid: String!, user: UserInput!) : User
    delUser(uid: String!) : User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const resolveFunctions = {

  RootQuery: {
    users(_, {}, context) {
      return Users;
    },
    user(_, { uid }, context) {
      return Users.find(user => user.uid === uid);
    }
  },
  RootMutation: {
    addUser(_, { user }, context) {
      let uid = Math.random().toString(36).substring(2,7);

      if (user.lastname.length < 1) {
        throw new Error("Lastname required.");
      }

      Users.push(Object.assign(user, { uid }));

      return Users.find(user => user.uid === uid);
    },
    updateUser(_, { uid, user }, context) {
      let currentUser = Users.find(user => user.uid === uid);

      if (!currentUser) {
        throw new Error("Unable to find user.");
      }

      Object.assign(currentUser, user);

      return currentUser;
    },
    delUser(_, { uid }, context) {
      let userIdx = Users.findIndex(user => user.uid === uid);

      if (userIdx < 0) {
        throw new Error("No user to delete");
      }

      return Users.splice(userIdx, 1)[0];
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: [ schemaDefinition ],
  resolvers : resolveFunctions
});

export default schema;
