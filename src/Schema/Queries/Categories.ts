import { GraphQLList } from "graphql";
import { CategoryType } from "../TypeDefs/Category";
import { Category } from "../../Entities/Category";

// 모든 카테고리 다 호출 -> 메인화면
export const GET_ALL_CATEGORIES = {
    type : new GraphQLList(CategoryType),
    resolve(root:any, args:any){
        return Category.find();
    }
}