import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {schema} from "./Schema";
// 백엔드, 프론트 엔드 연결하는 용도 like axios
import cors from 'cors';
import {createConnection} from 'typeorm';
import { Users } from './Entities/Users';
import { Articles } from './Entities/Articles';
import { Category } from './Entities/Category';
import { graphqlUploadExpress } from 'graphql-upload';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

const main = async () => {

    const REFRESH_TOKEN_SECRET : any = process.env.REFRESH_TOKEN_SECRET_KEY;
    const ACCESS_TOKEN_SECRET : any = process.env.ACCESS_TOKEN_SECRET_KEY;

    await createConnection({
        type:"mysql",
        host : process.env.CLEARDB_HOST_NAME,
        database : process.env.CLEARDB_DATABASE,
        username : process.env.CLEARDB_USER_NAME,
        password : process.env.CLEARDB_PASSWORD,
        // host : "localhost",
        // database :"GraphqlCRUD",
        // username : "root",
        // password :process.env.DB_PASSWORD,
        logging : false,
        // 코드로 entity를 만들었을 때 자동으로 mysql workbench에 동기화 해서 table 생성하는 부분
        // true 로 해놓은 채로 계속 저장하면 table 내에 entity 가 계속 생기니까 바꿀때만 true, 만들고 나면 false 로 바꿔줄것
        synchronize : false,  
        entities : [Articles, Category, Users]
    });

    var corsOptions = {
        origin : 'https://movie-talkie.netlify.app',
        // origin: 'http://localhost:3000',
        credentials: true // <-- REQUIRED backend setting
    };

    const app = express()
    app.use(express.urlencoded({extended:true}))
    app.use(cors(corsOptions))
    app.use(express.json())
    app.set("trust proxy", 1);
    app.use(cookieParser()); //위치 중요...!
    app.use(async(req, _, next) => {
        if(!req.headers.authorization){
            const refreshToken = req.cookies["refresh-token"];
            try {
                const data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
                // console.log(data);
                (req as any).userId = data.userId;
            } catch {}
            next();
        }
        if(req.headers.authorization) {
            const tokenInHeaders = req.headers.authorization?.substring(7);
            if(tokenInHeaders !== ""){
                const tokenData = verify(tokenInHeaders, ACCESS_TOKEN_SECRET) as any;
                // console.log(tokenData);
                (req as any).userId = tokenData.userId;
            }
            next();
        }
    });
    app.use("/graphql",
        graphqlUploadExpress({maxFieldSize:10000, maxFiles:3}),
        graphqlHTTP({
        schema,
        graphiql : true,
    }));

    app.listen(process.env.PORT || 3001, () => {
        console.log(`🚀 Server ready at http://localhost:3001/graphql`);
    })

};

main().catch((err) => {
    console.group(err)
});