// take the sample data
const { projects, clients } = require('../sampleData.js');

// bring anything we want from graphql using destructuring
// bring Object type from graphql
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql');

// client type
const ClientType = new GraphQLObjectType({
    // this object takes 2 different fields (name, fields)
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
});

// creating root query object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})