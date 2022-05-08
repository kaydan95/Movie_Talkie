import { GraphQLBoolean, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";

export const FileUploadType = new GraphQLScalarType({
    name : "FileUpload",
    serialize:(img_file:any) => img_file,
    parseValue:(img_file:any) => img_file,
    parseLiteral(img_file){
        return img_file;
    }
});

export const FileUploadResponseType = new GraphQLObjectType({
    name : "FileUploadResponse",
    fields : () => ({
        success : {type : GraphQLBoolean},
        message : {type : GraphQLString},
        errorStatus : {type : GraphQLBoolean},
        error : {type : GraphQLString},
        token : {type : GraphQLString}
    })
});


// export const UploadFileResponseType = new GraphQLObjectType({
//     name : "UploadFileResponseType",
//     fields : () => ({
//         url : { type : GraphQLString }
//     })
// });



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

