import { GraphQLList } from 'graphql';
import {UserType} from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
import { GraphQLID } from 'graphql';

interface IUser {
    id : number;
}

export const GET_ALL_USERS = {
    // GraphQL 을 이용해 다수의 User를 불러온다면 아래처럼 type 정의 필요
    type : new GraphQLList(UserType),
    resolve(){
        return Users.find();
    }
}

//현재 로그인한 사람의 정보를 가져옴
export const GET_USER = {
    type : UserType,
    async resolve(_ : any, __ : any, req : any){
        
        if(!req.userId) {
            return null;
        }

        return await Users.findOne({id : req.userId});
    }
}