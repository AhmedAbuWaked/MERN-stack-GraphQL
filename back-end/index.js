const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphQLSchema = require('./schema/schema');
const graphQLRoot = require('./schema/resolvers');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLRoot,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'unknown GraphQL Error ..!';
      const code = err.originalError.code || 500;

      return { message, status: code, data };
    }
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
