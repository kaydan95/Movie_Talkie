import React, {useState} from 'react';
import { useMutation } from '@apollo/client'
import { POST_ARTICLE } from '../Graphql/Mutation';
import { useMatch } from 'react-router-dom';
import { PostArticleBox, PostArticleWrapper } from '../Styles/PostArticle';

function PostArticle() {

    const userId = 4642;
    const postArticlePathMatch = useMatch("/postarticle/:cateId");
    const cateId = Number(postArticlePathMatch?.params.cateId);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    const [img_file, setFile] = useState<File>();

    const fileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }

        console.log(event.target.files[0]);

        setFile(event.target.files[0]);
    }

    const [postArticle, {error}] = useMutation(POST_ARTICLE);


    return (
        // <PostArticleWrapper>
        //     <PostArticleBox>

        //     </PostArticleBox>
        // </PostArticleWrapper>

        <div>
            <input type="text" placeholder="category_number" value={cateId}/><br/>
            <input type="text" placeholder="username" value={userId}/><br/>
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
                postArticle({variables : {userid:userId, password:password, title:title, context:context, img_file:img_file, category:cateId}});
            }}>Post Article</button>
        </div>
    )
}

export default PostArticle










