import { GraphQLID, GraphQLList } from "graphql";
import { ArticleType } from "../TypeDefs/Article";
import { Articles } from "../../Entities/Articles";
import _ from "lodash";

// 등록된 포스팅 다 들고오기 (카테고리 상관 없이)
export const GET_ALL_ARTICLES = {
    type : new GraphQLList(ArticleType),
    resolve(root:any, args:any){
        return Articles.find();
    }
}

// 해당 카테고리에 있는 포스트 다 들고오기
export const GET_ALL_CATE_ARTICLES = {
    type : new GraphQLList(ArticleType),
    args : {
        category : {type : GraphQLID}
    },
    resolve(root:any, category:any){
        return Articles.find({
            // Cannot find alias for relation at category 오류 고침..!
            relations : ['category'],
            where : category
        });
    }
}

// 해당 포스트 하나 내용 들고오기
export const GET_ARTICLE = {
    type : ArticleType,
    args : {
        id : {type : GraphQLID}
    },
    resolve(root:any, id:any){
        return Articles.findOne({
            where : id
        });
    }
}

// 해당 유저가 작성한 포스트 다 들고오기
export const GET_USERS_ARTICLES = {
    type : new GraphQLList(ArticleType),
    args : {
        userid : {type : GraphQLID}
    },
    resolve(root:any, userid:any){
        return Articles.find({
            // Cannot find alias for relation at category 오류 고침..!
            relations : ['userid'],
            where : userid
        });
    }
}