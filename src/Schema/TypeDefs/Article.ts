import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const ArticleType = new GraphQLObjectType({
    name : "Article",
    fields : () => ({
        id : {type : GraphQLID},
        username : {type : GraphQLString},
        password : {type : GraphQLString},
        title : {type : GraphQLString},
        context : {type : GraphQLString},
        img_file : {type : GraphQLString},
        createdAt : {type : GraphQLString},
        category : {type : GraphQLID}
    })
});