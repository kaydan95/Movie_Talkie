// client 에서 업로드한 파일을 aws 로 보내고 해당 위치 url을 반환하는 resolver -> s3.ts 에 있는 AWSS3Uploader 부분

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

            // console.log(await file);

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

