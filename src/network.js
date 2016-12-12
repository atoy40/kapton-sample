import Schema from './schema';
import { graphql } from 'graphql';
import { print } from 'graphql-tag/printer';

class FakeNetworkInterface {
  constructor(options = {}) {
    this.options = Object.assign({}, { latency: 1000 }, options);
  }

  query(request) {
    console.log("[apollo networking start]");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, this.options.latency);
    }).then(() => {
      console.log("[apollo networking done]");
      return graphql(Schema, print(request.query), null, null, request.variables);
    });;
  }
};

export function createFakeNetworkInterface(options) {
  return new FakeNetworkInterface(options);
};
