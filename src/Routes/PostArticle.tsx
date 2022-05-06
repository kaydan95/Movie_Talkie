import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_NEW_ACCESSTOKEN, POST_ARTICLE } from '../Graphql/Mutation';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { GET_USER } from '../Graphql/Queries';
import { ILocation } from './Main';
import { ArticleBox, ArticleContext, ArticleSection, ArticleWrapper, EditArticleImgBox, EditArticleTitle, EditButtonBox } from '../Styles/ArticleStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';


interface IPostArticleVerify {
    title : string;
    context : string;
    password : number;
}

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

    const [imgPreview, setImgPreview] = useState("");
    const [img_file, setFile] = useState<File>();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: { errors }} = useForm<IPostArticleVerify>({
        mode : "onSubmit"
    });

    const fileUpload = (fileBlob : any) => {
        if(!fileBlob){
            return;
        }
        // 수정할 이미지 미리보기
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onload = () => {
            setImgPreview(reader.result as any);
        }
        setFile(fileBlob);
    }

    const [postArticle, {error}] = useMutation(POST_ARTICLE, {
        context : {
            headers : {
                authorization: `Bearer ${data?.createNewAccessToken?.accessToken}`,
                "Content-Type": "application/json",
            }
        },
        onCompleted : () => {
            if(!error){
                alert("게시글 작성 완료");
                navigate(`/category/${cateId}`, {replace : true, state : { isLogged : isLogged }})
            }
        }
    });

    const onPostArticleValid = (data : IPostArticleVerify) => {
        postArticle({
            variables : {
                username : userName,
                password : data.password,
                title : data.title,
                context : data.context,
                img_file : img_file,
                category : cateId
            }
        })
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <ArticleWrapper>
            <ArticleBox>
                <EditArticleImgBox bgphoto={`${imgPreview}`}>
                    <div className='fileUploadBox'>
                        <label htmlFor='editImg'>
                            <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                        </label>
                        <input type = "file" onChange={(e) => {fileUpload(e.target.files![0])}} id='editImg'></input>
                    </div>
                    <EditArticleTitle>
                        <span>
                            <input 
                                placeholder='Write a Title'
                                {...register('title', {
                                    required : "this field is required",
                                    minLength : {
                                        value : 3,
                                        message : "Title should be more than 3 characters"
                                    }
                                })}
                            />
                        </span>
                        <div style={{width : "135px"}}>
                            <span>{userName} | </span>
                            <span>
                                <input 
                                    style={{width : '80px', fontSize : "1rem"}}
                                    type="password"
                                    placeholder='password'
                                    {...register('password', {
                                        required : "this field is required",
                                        maxLength : {
                                            value : 4,
                                            message : "Title should be less than 5 characters"
                                        }
                                    })}
                                />
                            </span>
                        </div>
                    </EditArticleTitle>
                </EditArticleImgBox>
                <ArticleSection>
                    <ArticleContext>
                        <textarea 
                            {...register('context', {
                                required : "this field is required",
                                minLength : {
                                    value : 10,
                                    message : "Title should be more than 10 characters"
                                }
                            })}
                        />
                    </ArticleContext>
                </ArticleSection>
            </ArticleBox>
            <EditButtonBox>
                <button onClick={() => handleCancel()}>CANCEL</button>
                <button onClick={handleSubmit(onPostArticleValid)}>POST</button>
            </EditButtonBox>
        </ArticleWrapper>
    )
}

export default React.memo(PostArticle)










