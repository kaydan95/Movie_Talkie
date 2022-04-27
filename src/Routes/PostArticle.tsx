import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_ACCESSTOKEN, POST_ARTICLE } from '../Graphql/Mutation';
import { useMatch } from 'react-router-dom';
import { PostArticleBox, PostArticleWrapper } from '../Styles/PostArticle';
import { GET_USER } from '../Graphql/Queries';



function PostArticle() {

    const postArticlePathMatch = useMatch("/postarticle/:cateId");
    const cateId = Number(postArticlePathMatch?.params.cateId);

    const { data : userData } = useQuery(GET_USER);

    console.log(userData);

    const userId = userData?.getUser?.id
    const token = userData?.getUser?.token

    const [ createToken, {data} ] = useMutation(CREATE_NEW_ACCESSTOKEN);

    useEffect(() => {
        if(userId !== "") {
            createToken({
                variables : {
                    id : userId,
                    refreshToken : token
                }
            });
        }
    }, [userId])


    console.log(data)


    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    const [img_file, setFile] = useState<File>();

    const fileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }
        setFile(event.target.files[0]);
    }

    const [postArticle, {error}] = useMutation(POST_ARTICLE, {
        context : {
            headers : {
                authorization: `Bearer ${data?.createNewAccessToken?.accessToken}`,
                "Content-Type": "application/json",
            }
        }
    });

    return (
        // <PostArticleWrapper>
        //     <PostArticleBox>

        //     </PostArticleBox>
        // </PostArticleWrapper>

        <div>
            <input type="text" placeholder="category_number" defaultValue={cateId}/><br/>
            <input type="text" placeholder="userid" defaultValue={userId}/><br/>
            <input type="password" placeholder="password" onChange={(event) => {
                setPassword(event.target.value);
                }}/><br/>
            <input type="text" placeholder="title" onChange={(event) => {
                setTitle(event.target.value);
            }}/><br/>
            <input type="text" placeholder="context" onChange={(event) => {
                setContext(event.target.value);
            }}/><br/>
            <input type="file" name="file" id="file" onChange={fileUpload}/>
            
            <button onClick={()=>{
                postArticle({variables : {password:password, title:title, context:context, img_file:img_file, category:cateId}});
            }}>Post Article</button>
        </div>
    )
}

export default PostArticle










