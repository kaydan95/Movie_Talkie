import React, {useState} from 'react';
import { useMutation } from '@apollo/client'
import { POST_ARTICLE } from '../Graphql/Mutation';

function PostArticle() {

    const category = 438631;
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
        <div>
            <h3>posting test</h3>
            <div>
                <input type="text" placeholder="category_number" value={category}/><br/>
                <input type="text" placeholder="username" onChange={(event) => {
                    setUserName(event.target.value);
                    }}/><br/>
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
                {/* 별점 칸 추가해서 별점 정보도 넘기기 */}
                <button onClick={()=>{
                    postArticle({variables : {username:username, password:password, title:title, context:context, img_file:img_file, category:category}});
                }}>Post Article</button>
            </div>
        </div>
    )
}

export default PostArticle
