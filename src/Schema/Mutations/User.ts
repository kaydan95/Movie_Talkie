import { GraphQLID, GraphQLString} from "graphql";
import { UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";
import bycript from 'bcryptjs';

interface IUser {
    id : number;
    name : string;
    username : string;
    password : string;
}

export const CREATE_USER = {
    type : UserType,
    args :{
        id : {type : GraphQLID},
        name : { type : GraphQLString },
        username : { type : GraphQLString },
        password : { type : GraphQLString },
    },
    async resolve(parent:any, args:IUser){
        const { id, name, username, password } = args;
        const hashedPassword = await bycript.hash(password, 8);
        await Users.insert({id, name, username, password:hashedPassword});
        return {
            id, name, username
        };
    }
};

export const DELETE_USER = {
    type : MessageType,
    args :{
        id : { type : GraphQLID }
    },
    async resolve(parent:any, args:any){
        const id = args.id;
        await Users.delete(id);

        return { success : true, message : "DELETE SUCCESSFULLY"}
    }
};

export const UPDATE_PASSWORD = {
    type : MessageType,
    args :{
        username : { type : GraphQLString },
        oldPassword : {type : GraphQLString},
        newPassword : {type : GraphQLString},
    },
    async resolve(parent:any, args:any){
        const {username, oldPassword, newPassword} = args;
        const user = await Users.findOne({username : username});

        if(!user){
            throw new Error("USERNAME DOESN'T EXIST");
        }
        const userPassword = user?.password;

        if(oldPassword === userPassword){
            const new_user = await Users.update({username : username}, {password : newPassword});

            console.log(new_user.affected);

            console.log({username : username}, {password : newPassword});

            return { success : true, message : "PASSWORD UPDATED"};
        } else {
            throw new Error("PASSWORD DO NOT MATCH!");
        }
    }
};
