import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { CategoryType } from "../TypeDefs/Category";
import { Category } from "../../Entities/Category";
import { MovieCredits, MovieDetailType, MovieSearchResults } from "../TypeDefs/MovieApi";
import { fetch as Fetch } from 'cross-fetch';

// 모든 카테고리 다 호출 -> 메인화면
export const GET_ALL_CATEGORIES = {
    type : new GraphQLList(CategoryType),
    resolve(root:any, args:any){
        return Category.find();
    }
}

// 특정 카테고리 검색 
export const GET_SEARCHED_CATEGORIES = {
    type : new GraphQLList(CategoryType),
    args : {
        category_title : {type : GraphQLString}
    },
    async resolve(root : any, args : { category_title : string }) {
        return Category.find().then((cates) => cates.filter((cate) => {
            if(cate.category_title.match(new RegExp(args.category_title, "i"))) {
                return cate;
            }
        }));
    }
}

interface IMovieArgs {
    keyword : string;
    page : number;
}


// openApi 검색 결과 호출
export const GET_MOVIE_SEARCH_RESULTS = {
    type : MovieSearchResults,
    args : {
        keyword : {type : GraphQLString},
        page : {type : GraphQLInt}
    },
    async resolve(root : any, args:IMovieArgs) {

        const API_KEY = process.env.MOVIE_API_KEY;

        return Fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${args.keyword}&page=${args.page}&include_adult=false`)
            .then((res) => res.json());
    }
}


// 해당 영화 상세 정보 호출
export const GET_MOVIE_DETAIL = {
    type : MovieDetailType,
    args : {
        id : {type : GraphQLInt}
    },
    async resolve(root : any, args : { id : number }) {

        const id = await args.id;

        const API_KEY = process.env.MOVIE_API_KEY;

        return Fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json());
    }
}

// 해당 영화 credits 정보 호출
export const GET_MOVIE_CREDITS = {
    type : MovieCredits,
    args : {
        id : {type : GraphQLInt}
    },
    async resolve(root : any, args : { id : number }) {

        const id = await args.id;

        const API_KEY = process.env.MOVIE_API_KEY;

        return Fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json());
    }
}