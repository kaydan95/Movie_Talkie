import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {schema} from "./Schema";
// 백엔드, 프론트 엔드 연결하는 용도 like axios
import cors from 'cors';
import {createConnection} from 'typeorm';
// import { Users } from './Entities/Users';
import { Articles } from './Entities/Articles';
import { Category } from './Entities/Category';
import { graphqlUploadExpress } from 'graphql-upload';
require('dotenv').config();

const main = async () => {

    await createConnection({
        type:"mysql",
        database :"GraphqlCRUD",
        username : "root",
        password :process.env.DB_PASSWORD,
        logging : false,
        // 코드로 entity를 만들었을 때 자동으로 mysql workbench에 동기화 해서 table 생성하는 부분
        // true 로 해놓은 채로 계속 저장하면 table 내에 entity 가 계속 생기니까 바꿀때만 true, 만들고 나면 false 로 바꿔줄것
        synchronize : false,   
        entities : [Articles, Category]
    });

    const app = express()
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(express.json())
    app.use("/graphql",
        graphqlUploadExpress({maxFieldSize:10000, maxFiles:3}),
        graphqlHTTP({
        schema,
        graphiql : true
    }))

    app.listen(3001, () => {
        console.log("🚀 Server ready at http://localhost:3001/graphql");
    })
};

main().catch((err) => {
    console.group(err)
});