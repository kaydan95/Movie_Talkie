import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';
import { ArticleType } from './Article';

export const CategoryType = new GraphQLObjectType({
    name : "Category",
    fields : () => ({
        id : {type : GraphQLID},
        category_title : {type : GraphQLString},
        category_releaseDate : {type : GraphQLString},
        category_imgPath : {type : GraphQLString},
        articles :  {type : ArticleType},
    })
})