// for export our Schema to excess main entry Point for our Server
// 밖으로 꺼내서 app 에서 사용하고자하는 Query와 Mutation 들을 정리해 내보내는 곳


import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from './Queries/User';
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD } from './Mutations/User';

const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        getAllUsers : GET_ALL_USERS
    }
})

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        createUser : CREATE_USER,
        deleteUser : DELETE_USER,
        updatePassword : UPDATE_PASSWORD
    }
})

export const schema = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})