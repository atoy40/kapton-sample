# Kapton sample

This is a small Polymer application using Kapton (an Apollo client integration
into Polymer) to talk with a GraphQL server.

In this application, the GraphQL enpoint is embedded into the client application
itself. An Apollo NetworkInterface has been written to simulate network and
latency.

The GrapĥQL schema is created using graphql-tools from the Apollo project.

## Run the application

```
git clone https://github.com/atoy40/kapton-sample
cd kapton-sample
npm install
node dev-server.js
```

Go to http://localhost:3000

## Code layout

* src : contains javascript code webpacked into a single file. This include
Apollo client, Kapton and GraphQL endpoint and schema. In a normal app, the
schema part (data.js and schema.js) would be only server side.
* app : contains Polymer elements.
