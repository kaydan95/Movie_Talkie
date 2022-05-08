// import { GraphQLObjectType, GraphQLString } from "graphql";

// export const S3UploadConfig = new GraphQLObjectType ({
//     name : "S3UploadConfig",
//     fields : () => ({
//         accessKeyId : {type : GraphQLString},
//         secretAccessKey : {type : GraphQLString},
//         region : {type : GraphQLString},
//         destinationBucketName : {type : GraphQLString},
//     })
// });

export type S3UploadConfig = {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
    destinationBucketName: string;
};
