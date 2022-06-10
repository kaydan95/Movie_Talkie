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
- __계기__ : 초반 계획에는 없던 로그인 기능을 추가하면서 token 에 대해 자세하게 알아보게 되었다. 여러 보안문제들 때문에 결국 로그인을 할때 refresh-token 과 access-token 두 가지 모두를 부여하되 refresh-token 은 httpOnly 쿠키로 저장하면서 동시에 DB에도 저장했다. 그리고 __url이 바뀔 때마다 DB에 있는 해당 유저의 refresh-token을 이용해 새로운 access-token을 부여해주는 방식__ 으로 설계했다. 그리고 이 access-token 을 카테고리 생성, 게시글작성, 수정, 삭제 등을 수행할 때 header에 담아 server로 보내 이를 해당 유저가 맞는지 다시 한번 확인하도록 했다.
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


