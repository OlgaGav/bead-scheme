const { gql } = require("graphql-tag");

const typeDefs = gql`
    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        phone_number: String
        email: String!
        password: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Draw {
        _id: ID!
        name: String!
        context: String
    }

    type DeleteResult {
        success: Boolean
        message: String
    }

    type Query {
        users: [User]
        draws: [Draw]
        userById(id: ID!): User
        drawById(id: ID!): Draw
        allUserDraws(userId: ID!): [Draw]
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addUser(
            first_name: String!
            last_name: String!
            phone_number: String
            email: String!
            password: String!
        ): Auth

        updateUser(
            id: ID!
            first_name: String
            last_name: String
            phone_number: String
            email: String
            password: String
        ): Auth

        addDraw(
          name: String!
          content: String
          author: ID!
        ): Draw

        updateDraw(
          id: ID!
          name: String!
          content: String
          author: ID!
        ): Draw

        deleteDraw(id: ID!): DeleteResult
    }

    input AuthInput {
        user: String!
        pass: String!
    }
`;

module.exports = typeDefs;
