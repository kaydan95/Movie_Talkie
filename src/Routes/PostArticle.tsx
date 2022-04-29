import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_ACCESSTOKEN, POST_ARTICLE } from '../Graphql/Mutation';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { PostArticleBox, PostArticleWrapper } from '../Styles/PostArticle';
import { GET_USER } from '../Graphql/Queries';
import { ILocation } from './Main';



function PostArticle() {

    const postArticlePathMatch = useMatch("/postarticle/:cateId");
    const cateId = Number(postArticlePathMatch?.params.cateId);

    // 계정 확인 accessToken 발급
    const { data : userData } = useQuery(GET_USER);
    const userId = userData?.getUser?.id;
    const userName = userData?.getUser?.username;
    const token = userData?.getUser?.token;
    const [isLogged, setIsLogged] = useState(false)
    const [ createToken, {data} ] = useMutation(CREATE_NEW_ACCESSTOKEN, {
        onCompleted : () => {
            setIsLogged(true);
        }
    });

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

    const location = useLocation() as ILocation;

    console.log(location);
    console.log(userData);
    console.log(data);


    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [context, setContext] = useState("");
    const [img_file, setFile] = useState<File>();
    const navigate = useNavigate();

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
        },
        onCompleted : (data) => {
            if(!error){
                alert("게시글 작성 완료");
                navigate(`/category/${cateId}`, {replace : true, state : { isLogged : isLogged }})
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
            <input type="text" placeholder="username" defaultValue={userName}/><br/>
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
                postArticle({variables : {username:userName, password:password, title:title, context:context, img_file:img_file, category:cateId}});
            }}>Post Article</button>
        </div>
    )
}

export default React.memo(PostArticle)










