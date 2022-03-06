import { GraphQLString } from "graphql";
import { Category } from "../../Entities/Category"
import { MessageType } from "../TypeDefs/Messages";
import { FileUploadType } from "../TypeDefs/File";
import { AWSS3Uploader } from "../../../modules/fileupload";

export const ADD_CATEGORY = {
    type : MessageType,
    args : {
        category_title : {type : GraphQLString},
        category_img : {type : FileUploadType}
    },
    async resolve(parent:any, args:any){
        const { category_title, category_img } = await args;

        const s3Uploader = new AWSS3Uploader({ 
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION,
            destinationBucketName: 'crud-cate-img'
        });

        const cateImg_file_url = (await s3Uploader.singleFileUploadResolver(category_img)).url;

        console.log(cateImg_file_url);

        await Category.insert({category_title, category_img : cateImg_file_url});

        return { success : true, message : "새로운 카테고리 < " + category_title + " > 생성완료"};
    }
}