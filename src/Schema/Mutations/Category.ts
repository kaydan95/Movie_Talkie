import { GraphQLID, GraphQLString } from "graphql";
import { Category } from "../../Entities/Category"
import { MessageType } from "../TypeDefs/Messages";

export const ADD_CATEGORY = {
    type : MessageType,
    args : {
        id : {type : GraphQLID},
        category_title : {type : GraphQLString},
    },
    async resolve(parent:any, args:any){
        const { id, category_title } = await args;

        await Category.insert({id, category_title});

        return { success : true, message : "새로운 카테고리 < " + category_title + " > 생성완료"};
    }
}