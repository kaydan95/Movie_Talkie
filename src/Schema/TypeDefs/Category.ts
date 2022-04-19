import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';
import { ArticleType } from './Article';

export const CategoryType = new GraphQLObjectType({
    name : "Category",
    fields : () => ({
        id : {type : GraphQLID},
        category_title : {type : GraphQLString},
        articles :  {type : ArticleType}
    })
})