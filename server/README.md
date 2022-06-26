# :popcorn: Movie-Talkie (Back End)
<!-- [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) -->
<img src="https://user-images.githubusercontent.com/85853145/167378932-a22710dc-537d-4807-b798-ce88ef67d028.png" width="950" height="550">


## Summary / 요약
- __프로젝트 기간__ : 2021.03 - 2021.05 (계속해서 부분 업데이트 중)
- __메인 개발 환경__ : ![GraphQl](https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=GraphQL&logoColor=white) ![Apollo GraphQl](https://img.shields.io/badge/-Apollo%20GraphQL-311C87?style=flat-square&logo=Apollo%20GraphQL&logoColor=white) ![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white) ![ts-node](https://img.shields.io/badge/-ts_Node-3178C6?style=flat-square&logo=ts%20node&logoColor=white) ![Amazon AWS](https://img.shields.io/badge/-Amazon%20AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white) ![Amazon S3](https://img.shields.io/badge/-Amazon%20S3-569A31?style=flat-square&logo=Amazon%20S3&logoColor=white) ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)


## Installation / 설치
<!--     npm i cors -->
    npm i express
<!--     npm i express-graphql
    npm i graphql
    npm i graphql-upload
    npm i multer
    npm i multer-s3
    npm i node-fetch
    npm i aws-sdk
    npm i bcrypt
    npm i class-transformer
    npm i cookie-parser
    npm i jsonwebtoken
    npm i cross-fetch
    npm i typeorm -->
    
## Start / 구동
    npm run dev
    
## Features / 특징
### 1. Amazon S3 를 이용한 이미지 업로드
- __계기__ : 한 게시글 당 대표 이미지 하나라고 하지만 DB에 큰 용량의 이미지를 바로 업로드 하는 건 무리라고 판단
- __해결책__ : 클라우드에 올려놓고 그 위치만 DB에 저장하자!   
  __client측에서 업로드한 이미지를 s3로 보내 해당 bucket에 저장한 뒤 그 위치 url 을 DB에 저장하는 방식으로__ 

1) 업로드할 파일 type 정의

```typescript
export const FileUploadType = new GraphQLScalarType({
    name : "FileUpload",
    serialize:(img_file:any) => img_file,
    parseValue:(img_file:any) => img_file,
    parseLiteral(img_file){
        return img_file;
    }
});
```

2) 업로더와 response type 정의

```typescript
// aws s3 에 업로드한 후 해당 이미지 url을 반환
export namespace ServerFileUploads {

    export type UploadFileResponseType = {
        url : string;
    }
    
    export interface IUploader {
        singleFileUploadResolver : (parent : any, file : any)
            => Promise<UploadFileResponseType>;
    }

}
```
3) client 측에서 보낸 이미지를 s3로 업로드할 stream, uploader


```typescript
import AWS from "aws-sdk";
import stream from "stream";
import { S3UploadConfig } from "../src/Schema/TypeDefs/S3Upload";
import { ServerFileUploads } from "../src/Schema/TypeDefs/File"
require('dotenv').config();

type S3UploadStream = {
    writeStream : stream.PassThrough;
    promise : Promise<AWS.S3.ManagedUpload.SendData>
};

export class AWSS3Uploader implements ServerFileUploads.IUploader {
    public config : S3UploadConfig;
    private s3 : AWS.S3;

    constructor(config : S3UploadConfig) {
        AWS.config = new AWS.Config();
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        this.config = config;
        this.s3 = new AWS.S3();
    }

    private createUploadStream(key : string) : S3UploadStream {
        const pass = new stream.PassThrough();
        return {
            writeStream : pass,
            promise : this.s3
                .upload({
                    Bucket : this.config.destinationBucketName,
                    Key : key,
                    Body : pass,
                    ContentType : 'image/jpeg',
                }). promise()
        };
    }

    async singleFileUploadResolver (file : any)
        : Promise<ServerFileUploads.UploadFileResponseType> {
            const { filename, createReadStream } = await file.file;

            const { writeStream, promise } = this.createUploadStream(filename);
    
            const readStream = createReadStream();
            
            // 전달받은 file 내 createReadStream 과 aws 버킷에 연결하려고 PassThrough 한 걸 pipe 로 최종 연결
            readStream.pipe(writeStream);
    
            const result = await promise;
    
            console.log(result);
    
            return {
                url : result.Location 
            };
        } 
}
```

4. 해당 resolver 를 다음과 같이 사용
```typescript
// postArticle 일부
const s3Uploader = new AWSS3Uploader({ 
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
    destinationBucketName: 'crud-movie-img'
});

const img_file_url = (await s3Uploader.singleFileUploadResolver(img_file)).url;
```

### 2. 영화 카테고리 생성 시 MovieApi 를 이용해 고유키 지정
- __계기__ : 한 영화당 하나의 카테고리가 만들어져야했다 -> 카테고리 고유키의 역할이 더더욱 중요해짐   
- __해결책__ : 이전 netflix_clone 프로젝트에 이용했던 MovieApi 를 이용, 그 __해당 api의 영화 고유 키와 카테고리 고유키를 일치__ 시키기로했다.  
       api를 이용해 영화 검색 후 카테고리 생성 -> 생성 시 해당 영화 고유 키와 타이틀, 대표 이미지, 개봉 년도를 DB에 저장

1) Category Entity 생성 시 `@PrimaryGeneratedColumn` 대신, `@PrimaryColumn` 사용해 api로 받아온 영화 고유키가 들어갈 수 있도록 설정.
```typescript
@Entity()
export class Category extends BaseEntity {

    @PrimaryColumn({ type: "int", name: "id" })
    id! : number;
    
    ...
    
}
```

### 3. token 문제
- __계기__ : 초반 계획에는 없던 로그인 기능을 추가하면서 token 에 대해 자세하게 알아보게 되었다. 기본적으로 게시글을 읽는 기능에 대해서는 회원이 아니라도 누구나 가능 할 수 있도록 했지만 그 외 카테고리를 생성하고 게시글을 쓰고 편집하는 기능에는 오로지 회원만 가능하도록 변경했다. 따라서 해당 기능을 수행할 때에는 해당 유저에 대한 정보와 access-token 이 있어야한다고 생각했다. 따라서 최초 로그인 부터 새로운 access-token 을 부여하는 과정은 다음과 같이 처리했다.   
    1) 최초 로그인 시 refresh-token 을 http-only 형식으로 쿠키에 저장하고 여기에서 현재 로그인한 유저 정보를 받는다.
    2) 로그인 시 사용했던 email 로 db 에서 일치하는 회원정보를 찾는다.
    3) 해당 회원정보를 이용해 새로운 access-token 을 생성하고 client 에 부여한다.
    4) 발행된 새로운 access-token 을 카테고리 생성, 게시글작성, 수정, 삭제 등을 수행할 때 header에 담아 server로 보내 access-token 을 가지고 있을때만 기능을 수행할 

- `app.use(cookieParser());` 의 위치가 중요 -> _위치때문에 헤맸다_ :smiling_face_with_tear:

```typescript
... //index.ts

app.use(cookieParser()); 
app.use(async(req, _, next) => {
    // 현재 로그인된 유저 정보 파악
    if(!req.headers.authorization){
        const refreshToken = req.cookies["refresh-token"];
        try {
            const data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
            (req as any).userId = data.userId;
        } catch {}
        next();
    }
    // Header에 담겨온 access-token 을 통해 해당 유저가 맞는지 확인
    if(req.headers.authorization) {
        const tokenInHeaders = req.headers.authorization?.substring(7);
        if(tokenInHeaders !== ""){
            const tokenData = verify(tokenInHeaders, ACCESS_TOKEN_SECRET) as any;
            (req as any).userId = tokenData.userId;
        }
        next();
    }
});

...
```

### 4. Cors 정책 문제
: 프론트단의 도메인과 달라 생긴 문제점! `index.ts` 에서 cors 문제를 해결해줘야했다. 이전 netflix_clone 프로젝트에서 cors 문제를 한번 마주하고 난 뒤로 많이 당황하지 않고 해결할 방법을 빠르게 찾아 볼 수 있었던 것 같다.      
```typescript
    import cors from 'cors';
    
    var corsOptions = {
        origin : 'https://movie-talkie.netlify.app',
        // origin: 'http://localhost:3000',
        credentials: true // <-- REQUIRED backend setting
    };
    
    const app = express()
    app.use(cors(corsOptions))
    
    ...(중략)
```

