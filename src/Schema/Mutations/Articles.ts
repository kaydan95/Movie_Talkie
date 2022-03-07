import { GraphQLString, GraphQLID } from "graphql";
import { Articles } from "../../Entities/Articles"
import { FileUploadType } from "../TypeDefs/File";
import { MessageType } from "../TypeDefs/Messages";
import { AWSS3Uploader } from "../../../modules/fileupload";


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
    async resolve(parent:any, args:any){
        // client 에서 업로드한 파일을 aws 에 올리고 url 을 반환하는 resolver 가 필요 -> AWSS3Uploader
        // 그 resolver 로 부터 받은 url을 최종 entity에 업로드 해야함
        // console.log(await args);

        const {username, password, title, context, img_file, category} = await args;

        const s3Uploader = new AWSS3Uploader({ 
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.REGION,
            destinationBucketName: 'crud-movie-img'
        });

        const img_file_url = (await s3Uploader.singleFileUploadResolver(img_file)).url;

        console.log(img_file_url);

        await Articles.insert({username, password, title, context, img_file : img_file_url, category});

        return { success : true, message : "POST SUCCESSFULLY!"};
    }
};

export const DELETE_ARTICLE = {
    type : MessageType,
    args : {
        id : { type : GraphQLID},
        password : { type : GraphQLString }
    },
    async resolve(parent : any, args : any){

        let { id, password } = args;

        const article = await Articles.findOne({id : id});

        if(!article) {
            throw new Error("SOMETHING IS WRONG...")
        }

        const real_pw = article.password;
        const real_id = article.id;

        // console.log(id, real_id, password, real_pw);
        // id = parseInt(id);
        // console.log(id, real_id, password, real_pw);

        if(parseInt(id) === real_id && password === real_pw) {
            await Articles.delete({id : id});

            return { success : true, message : "DELETE SUCCESSFULLY"}
        } else {
            return { success : false, message : "PASSWORD DOES NOT MATCH!"}
        }
    }
};


// 수정할 것
// export const UPDATE_ARTICLE = {
//     type : MessageType,
//     args : {
//         password : { type : GraphQLString }
//     },
//     async resolve(parent : any, args : any){

//         const typed_password  = await args.password;
//         const pw_db = await Articles.findOne({password : typed_password});

//         if(!pw_db){
//             throw new Error("THAT PASSWORD DOESN'T EXIST")
//         }

//         const real_pw = pw_db.password;

//         if(real_pw === typed_password){

//             await Articles.delete(typed_password);
            
//             return { success : true, message : "DELETE SUCCESSFULLY"}

//         } else {
//             throw new Error("PASSWORD DOES NOT MATCH!");
//         }
//     }
// };