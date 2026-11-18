export const typeDefs = `#graphql
  type RankedDay {
    rank: Int!
    date: String!
    score: Int!
  }

  type Recommendations {
    skiing: [RankedDay!]!
    surfing: [RankedDay!]!
    outdoorSightseeing: [RankedDay!]!
    indoorSightseeing: [RankedDay!]!
  }

  type Query {
    recommendations(city: String!): Recommendations!
  }
`;