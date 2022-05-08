import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt} from 'graphql';

export const UserType = new GraphQLObjectType({
    name : "User",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        username : {type : GraphQLString},
        password : {type : GraphQLString},
        token : {type : GraphQLString}
    })
});

export const UserToken = new GraphQLObjectType({
    name : "Token",
    fields : () => ({
        accessToken : {type : GraphQLString}
    })
});

export const LoginType = new GraphQLObjectType({
    name : "Login",
    fields : () => ({
        user : {type : UserType},
        accessToken : {type : GraphQLString}
    })
})

export const CheckUserType = new GraphQLObjectType({
    name : "CheckUserType",
    fields : () => ({
        bothOkay : {type : GraphQLInt},
        userNameTaken : {type : GraphQLInt},
        userIdTaken : {type : GraphQLInt},
        bothTaken : {type : GraphQLInt},
    })
})