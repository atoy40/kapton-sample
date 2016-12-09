import Schema from './schema';
import { graphql } from 'graphql';
import { print } from 'graphql-tag/printer';

class FakeNetworkInterface {
  query(request) {
    return graphql(Schema, print(request.query), null, null, request.variables);
  }
};

export function createFakeNetworkInterface() {
  return new FakeNetworkInterface();
};
