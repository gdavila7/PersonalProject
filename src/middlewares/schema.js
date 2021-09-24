// below is a decapreted library
//import { makeExecutableSchema } from 'graphql-tools';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from './resolvers';

const typeDefs = `
    type Query {
        hello: String
        greet(name: String): String
        series: [Serie]
    }

    type Serie {
        _id: ID
        title: String!
        urlImage: String!
        category: String
        genres: [String]
        createdby: String
    }

    type Mutation {
       createSerie(input: SerieInput): Serie 
    }

    input SerieInput {
        title: String!
        urlImage: String!
        category: String
        genres: [String]
        createdby: String
    }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
