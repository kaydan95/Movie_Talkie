import { GraphQLList } from 'graphql';
import {CheckUserType, UserType} from '../TypeDefs/User';
import {Users} from '../../Entities/Users';
import { GraphQLString } from 'graphql';

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

// 중복확인

interface ICheck {
    userId : string,
    userName : string,
}


export const CHECK_USER = {
    type : CheckUserType,
    args : {
        userId : { type : GraphQLString },
        userName : { type : GraphQLString }
    },
    async resolve(parents : any, args : ICheck) {

        const userWithId = await Users.findOne({name : args.userId});
        const userWithName = await Users.findOne({username : args.userName});
        
        if(!userWithId) {
            if(!userWithName) {
                return {
                    bothOkay : 1
                }
            }
            else return { 
                userNameTaken : 1
            }
        }
        if(userWithId) {
            if(!userWithName) {
                return { 
                    userIdTaken : 1
                }
            }
            else return { 
                bothTaken : 1
            }
        }

    }
}