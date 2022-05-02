// for export our Schema to excess main entry Point for our Server
// 밖으로 꺼내서 app 에서 사용하고자하는 Query와 Mutation 들을 정리해 내보내는 곳


import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS, GET_USER } from './Queries/User';
import { GET_ALL_CATEGORIES, GET_MOVIE_SEARCH_RESULTS, GET_MOVIE_DETAIL, GET_MOVIE_CREDITS, GET_SEARCHED_CATEGORIES } from './Queries/Categories';
import { GET_ALL_ARTICLES, GET_ALL_CATE_ARTICLES, GET_ARTICLE, GET_USERS_ARTICLES } from './Queries/Articles';
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD, LOGIN, CREATE_NEW_ACCESSTOKEN, LOGOUT } from './Mutations/User';
import { POST_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE } from './Mutations/Articles';
import { ADD_CATEGORY } from './Mutations/Category';

const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        getAllUsers : GET_ALL_USERS,
        getUser : GET_USER,
        getArticle : GET_ARTICLE,
        getAllArticles : GET_ALL_ARTICLES,
        getAllCateArticles : GET_ALL_CATE_ARTICLES,
        getUsersArticles : GET_USERS_ARTICLES,
        getAllCategories : GET_ALL_CATEGORIES,
        getAllSearchedCategories : GET_SEARCHED_CATEGORIES,
        getMovieSearchResults : GET_MOVIE_SEARCH_RESULTS,
        getMovieDetail : GET_MOVIE_DETAIL,
        getMovieCredits : GET_MOVIE_CREDITS
    }
})

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        createUser : CREATE_USER,
        deleteUser : DELETE_USER,
        updatePassword : UPDATE_PASSWORD,
        postArticle : POST_ARTICLE,
        addCategory : ADD_CATEGORY,
        deleteArticle : DELETE_ARTICLE,
        updateArticle : UPDATE_ARTICLE,
        login : LOGIN,
        logout : LOGOUT,
        createNewAccessToken : CREATE_NEW_ACCESSTOKEN
    }
})

export const schema = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})