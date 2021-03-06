import { GraphQLID, GraphQLString} from "graphql";
import { LoginType,  UserToken,  UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";
import bcrypt from 'bcryptjs';
import { sign } from "jsonwebtoken";
require('dotenv').config();

const ACCESS_TOKEN_SECRET : any = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET : any = process.env.REFRESH_TOKEN_SECRET_KEY;

interface IUser {
    id : number;
    name : string;
    username : string;
    password : string;
}

interface ILogin {
    name : string;
    password : string;
}

interface IToken {
    name : string;
}

export const CREATE_NEW_ACCESSTOKEN = {
    type : UserToken,
    args :{
        name : {type : GraphQLString},
    },
    async resolve(parent:any, args:IToken){
        const { name } = args;

        if(name === null) {
            throw "expired data"
        }
        const user = await Users.findOne({name : name});

        const newAccessToken = sign({userId : user?.id, pw : user?.password}, ACCESS_TOKEN_SECRET, {expiresIn : "30min"});
        return { 
            accessToken : newAccessToken
        };

    }
};

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
        const hashedPassword = await bcrypt.hash(password, 8);
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

// ????????? -> ?????? ??? ??? ??????
export const LOGIN = {
    type : LoginType,
    args : {
        name : { type : GraphQLString},
        password : { type : GraphQLString}
    },
    async resolve(parent : any, args : ILogin, {res} : any) {
        const { name, password } = args;

        const user = await Users.findOne({ name : name });

        if(!user){
            return null;
        }
        else {
            const valid = await bcrypt.compare(password, user.password);
            if(!valid) {
                return null;
            }
            else {
                // 1. ?????????????????? ?????? -> ?????? ?????? ?????? ?????? (accessToken ??? ?????? ?????? client??? ??????, refreshToken??? ????????? ??????..?)
                const accessToken = sign({userId : user.id}, ACCESS_TOKEN_SECRET, {expiresIn : "5min"});
                const refreshToken = sign({userId : user.id, pw : user.password}, REFRESH_TOKEN_SECRET, {expiresIn : "1d"});

                const id = user.id
                await Users.update(id, {token : refreshToken});
                const one = await Users.findOne({id : id});
                res.cookie("refresh-token", refreshToken, {httpOnly : true, secure : true, sameSite : "none"});

                return {
                    user : one,
                    accessToken : accessToken
                }
            }
        }
    }
}

// ????????????
export const LOGOUT = {
    type : MessageType,
    async resolve(parent:any, _:any, {res} : any){

        res.clearCookie("refresh-token", {httpOnly : true, secure : true, sameSite : "none"});

        return { success : true, message : "LOGOUT SUCCESSFULLY"}
    }
};


