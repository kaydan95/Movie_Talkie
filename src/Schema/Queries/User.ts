import { GraphQLList } from 'graphql';
import {UserType} from '../TypeDefs/User';
import {Users} from '../../Entities/Users';

export const GET_ALL_USERS = {
    // GraphQL 을 이용해 다수의 User를 불러온다면 아래처럼 type 정의 필요
    type : new GraphQLList(UserType),
    resolve(){
        return Users.find();
    }
}