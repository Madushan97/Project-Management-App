// take the sample data
// const { projects, clients } = require('../sampleData.js');

// Mongoose Models
const Project = require('../models/Project')
const Client = require('../models/Client')

// bring anything we want from graphql using destructuring
// bring Object type from graphql
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
} = require('graphql');

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
                return Client.findById(parent.clientId);
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
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        // for clients
        // getting all the clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        }
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },

        // Delete Client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id);
                // TODO -> if a client assign to a project then that should be remove as well
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})