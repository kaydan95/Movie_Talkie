# :clapper: Movie-Talkie (Back End) [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Summary / 요약
- __프로젝트 기간__ : 2021.03 - 2021.05 (계속해서 부분 업데이트 중)
- __메인 개발 환경__ : ![GraphQl](https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=GraphQL&logoColor=white) ![Apollo GraphQl](https://img.shields.io/badge/-Apollo%20GraphQL-311C87?style=flat-square&logo=Apollo%20GraphQL&logoColor=white) ![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white) ![ts-node](https://img.shields.io/badge/-ts_Node-3178C6?style=flat-square&logo=ts%20node&logoColor=white) ![Amazon AWS](https://img.shields.io/badge/-Amazon%20AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white) ![Amazon S3](https://img.shields.io/badge/-Amazon%20S3-569A31?style=flat-square&logo=Amazon%20S3&logoColor=white) ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white)

## Installation / 설치
    npm i cors
    npm i express
    npm i express-graphql
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
    npm i typeorm
    
## Start / 구동
    npm start
    
## Features / 특징
### 1. Amazon S3 를 이용한 이미지 업로드
- 계기 : 한 게시글 당 대표 이미지 하나라고 하지만 DB에 큰 용량의 이미지를 바로 업로드 하는 건 무리라고 판단
- 해결책 : 클라우드에 올려놓고 그 위치만 DB에 저장하자!   
  client측에서 업로드한 이미지를 s3로 보내 해당 bucket에 저장한 뒤 그 위치 url 을 DB에 저장하는 방식

1. 업로드할 파일 type 정의

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

2. 업로더와 response type 정의

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
3. client 측에서 보낸 이미지를 s3로 업로드할 stream, uploader


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
계기 : 한 영화당 하나의 카테고리가 만들어져야함 -> 카테고리 고유키의 역할이 더더욱 중요해짐   
해결책 : 이전 netflix_clone 프로젝트에 이용했던 MovieApi 를 이용, 그 해당 api의 영화 고유 키와 카테고리 고유키를 일치시키기로함   
       api를 이용해 영화 검색 후 카테고리 생성 -> 생성 시 해당 영화 고유 키와 타이틀, 대표 이미지, 개봉 년도를 DB에 저장

1) Category Entity 생성 시 `@PrimaryGeneratedColumn` 대신, `@PrimaryColumn` 사용해 api로 받아온 영화 고유키가 들어갈 수 있도록 함
```typescript
@Entity()
export class Category extends BaseEntity {

    @PrimaryColumn({ type: "int", name: "id" })
    id! : number;
    
    ...
    
}
```




