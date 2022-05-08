import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";


export const MovieType = new GraphQLObjectType({
    name : "Movie",
    fields : () => ({
        id : {type : GraphQLInt},
        adult : {type : GraphQLBoolean},
        backdrop_path : {type : GraphQLString},
        original_language : {type : GraphQLString},
        original_title : {type : GraphQLString},
        overview : {type : GraphQLString},
        poster_path : {type : GraphQLString},
        release_date : {type : GraphQLString},
        title : {type : GraphQLString}
    })
});

export const MovieDetailType = new GraphQLObjectType({
    name : "MovieDetail",
    fields : () => ({
        id : {type : GraphQLInt},
        adult : {type : GraphQLBoolean},
        backdrop_path : {type : GraphQLString},
        original_language : {type : GraphQLString},
        original_title : {type : GraphQLString},
        overview : {type : GraphQLString},
        poster_path : {type : GraphQLString},
        release_date : {type : GraphQLString},
        runtime : {type : GraphQLInt},
        title : {type : GraphQLString},
        status : {type : GraphQLString},
        tagline : {type : GraphQLString},
        genres : {type : new GraphQLList(GenreType)}
    })
});

export const GenreType = new GraphQLObjectType({
    name : "Genre",
    fields : () => ({
        id : {type : GraphQLInt},
        name : {type : GraphQLString}
    })
});

export const CastType = new GraphQLObjectType({
    name : "Cast",
    fields : () => ({
        id : {type : GraphQLInt},
        gender: {type : GraphQLInt},
        name: {type : GraphQLString},
        original_name: {type : GraphQLString},
        profile_path: {type : GraphQLString},
        cast_id: {type : GraphQLInt},
        character: {type : GraphQLString},
        credit_id: {type : GraphQLString},
        order: {type : GraphQLInt},
    })
});

export const CrewType = new GraphQLObjectType({
    name : "Crew",
    fields : () => ({
        gender: {type : GraphQLInt},
        id: {type : GraphQLInt},
        name: {type : GraphQLString},
        original_name: {type : GraphQLString},
        department : {type : GraphQLString},
        known_for_department: {type : GraphQLString},
        job: {type : GraphQLString},
    })
});


export const MovieSearchResults = new GraphQLObjectType({
    name : "MovieSearchResults",
    fields : () => ({
        page : {type : GraphQLInt},
        results : {type : new GraphQLList(MovieType)},
        total_pages : {type : GraphQLInt},
        total_results : {type : GraphQLInt}
    })
});

export const MovieCredits = new GraphQLObjectType({
    name : "MovieCredits",
    fields : () => ({
        id : {type : GraphQLInt},
        cast : {type : new GraphQLList(CastType)},
        crew : {type : new GraphQLList(CrewType)},
    })
});
