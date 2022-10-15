// take the sample data
const { projects, clients } = require('../sampleData.js');

// bring anything we want from graphql using destructuring
// bring Object type from graphql
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql');

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

// project type
const ProjectType = new GraphQLObjectType({
    // this object takes 2 different fields (name, fields)
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                // parent = projects
                return clients.find((client) => client.id === parent.clientId);
            }
        },
    })
});

// creating root query object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        // for clients
        // getting all the clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            }
        },
        client: {
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