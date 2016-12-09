import { makeExecutableSchema } from 'graphql-tools';
import Users from './data';

const schemaDefinition = `
  type User {
    uid: String!
    lastname: String!
  }

  type RootQuery {
    users(limit: Int): [User!]
  }

  type RootMutation {
    addUser(uid: String!, lastname: String!) : User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const resolveFunctions = {
  RootQuery: {
    users(_, { limit = 5 }, context) {
      return Users.slice(0, limit);
    },
  },
  RootMutation: {
    addUser(_, user, context) {
      Users.push(user);
      return user;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: [ schemaDefinition ],
  resolvers : resolveFunctions
});

export default schema;
