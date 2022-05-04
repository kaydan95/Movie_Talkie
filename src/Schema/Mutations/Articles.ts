import { GraphQLString, GraphQLID, graphqlSync } from "graphql";
import { Articles } from "../../Entities/Articles"
import { FileUploadType } from "../TypeDefs/File";
import { MessageType } from "../TypeDefs/Messages";
import { AWSS3Uploader } from "../../../modules/fileupload";


// 게시글 작성 (postArticle)
export const POST_ARTICLE = {
    type : MessageType,
    args : {
        username : {type : GraphQLString},
        password : {type : GraphQLString},
        title : {type : GraphQLString},
        context : {type : GraphQLString},
        img_file : {type : FileUploadType},
        category : {type : GraphQLID}
    },
    async resolve(parent:any, args:any, req : any){
        // client 에서 업로드한 파일을 aws 에 올리고 url 을 반환하는 resolver 가 필요 -> AWSS3Uploader
        // 그 resolver 로 부터 받은 url을 최종 entity에 업로드 해야함
        // console.log(await args);

        if(!req.userId) {
            return null;
        }

        const {username, password, title, context, img_file, category} = await args;

        const s3Uploader = new AWSS3Uploader({ 
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION,
            destinationBucketName: 'crud-movie-img'
        });

        const img_file_url = (await s3Uploader.singleFileUploadResolver(img_file)).url;

        // console.log(img_file_url)

        await Articles.insert({username, password, title, context, img_file : img_file_url, userid : req.userId, category});

        return { success : true, message : "POST SUCCESSFULLY!"};
    }
};



// 게시글 삭제 (deleteArticle)
export const DELETE_ARTICLE = {
    type : MessageType,
    args : {
        id : { type : GraphQLID},
        username : { type : GraphQLString },
        password : { type : GraphQLString }
    },
    async resolve(parent : any, args : any){

        let { id, username, password } = args;

        const article = await Articles.findOne({id : id});

        if(!article) {
            throw new Error("SOMETHING IS WRONG...")
        }

        const real_pw = article.password;
        const real_username = article.username;
        const real_id = article.id;

        // console.log(id, real_id, password, real_pw);
        // id = parseInt(id);
        // console.log(id, real_id, password, real_pw);

        if(parseInt(id) === real_id && password === real_pw && username === real_username) {
            await Articles.delete({id : id});

            return { success : true, message : "DELETE SUCCESSFULLY"}
        } else {
            return { success : false, message : "PASSWORD DOES NOT MATCH!"}
        }
    }
};



// 게시글 수정 (updateArticle)
export const UPDATE_ARTICLE = {
    type : MessageType,
    args : {
        id : { type : GraphQLID },
        editTitle : { type : GraphQLString },
        editContext : { type : GraphQLString },
        editDate : { type : GraphQLString },
        editImg_file : { type : FileUploadType },
    },
    async resolve(parent : any, args : any){
        let { id, editTitle, editContext, editDate, editImg_file } = args;

        const article = await Articles.findOne({id : id});

        const s3Uploader = new AWSS3Uploader({ 
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION,
            destinationBucketName: 'crud-movie-img'
        });

        const editImg_file_url = (await s3Uploader.singleFileUploadResolver(editImg_file)).url;

        // console.log(editImg_file_url);

        const id_db = article?.id;

        if(parseInt(id) === id_db) {
            await Articles.update(id_db, {title : editTitle, context : editContext, createdAt : editDate, img_file : editImg_file_url});

            // const check_article = await Articles.findOne({id : id});
            // console.log(check_article);

            return { success : true, message : "UPDATED"}
        } else {
            return { success : false, message : "UPDATED ERROR"}
        }
    }
};