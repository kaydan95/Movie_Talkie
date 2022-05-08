import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { GET_ARTICLE } from '../Graphql/Queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { ArticleBox, ArticleContext, ArticleSection, ArticleTitle, ArticleWrapper, EditArticleImgBox, EditArticleTitle, EditButtonBox} from '../Styles/ArticleStyle';
import { UPDATE_ARTICLE } from '../Graphql/Mutation'
import { useMatch, useNavigate } from 'react-router-dom';

function EditArticle() {

    const editArticlePathMatch = useMatch("/category/:cateId/editArticle/:articleId");
    console.log(editArticlePathMatch);
    const articleId = Number(editArticlePathMatch?.params.articleId);
    const navigate = useNavigate();
    const today = new Date();
    const month = today.getMonth() + 1
    const editDate = today.getFullYear() + "-" + month + "-" + today.getDate()


    const [articles, setArticles] = useState({
        title : " ",
        context : " ",
        img_file : " ",
        username : " ",
        createdAt : " ",
    });

    function convertDate(milliSecond : number) {
        const data = new Date(milliSecond);  //Date객체 생성

        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
    
        return `${year}-${month}-${date}`;
    };

    const { loading, error, data } = useQuery(GET_ARTICLE, {
        variables : {id : articleId},
        onCompleted : (data) => {
            if(articleId === 0) {
                setArticles({
                    title : "NO DATA",
                    context : "NO DATA",
                    img_file : "NO IMG",
                    username : "NO DATA",
                    createdAt : "NO DATA",
                })
            } else {
                setArticles({
                    title : data.getArticle.title,
                    context : data.getArticle.context,
                    img_file : data.getArticle.img_file,
                    username : data.getArticle.username,
                    createdAt : data.getArticle.createdAt,
                })
            }
        }
    });

    function handleChange(event:any) {
        const { name , value } = event.target
        const newValue = value.replaceAll("<br>", "\r\n");
        setArticles({
            ...articles,
            [name] : newValue
        })
    };

    const [imgPreview, setImgPreview] = useState(data?.getArticle?.img_file);

    const [editImg_file, setFile] = useState<File>();

    const fileUpload = (fileBlob : any) => {
        if(!fileBlob){
            return;
        }
        // 수정할 이미지 미리보기
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        reader.onload = () => {
            setImgPreview(reader.result);
        }
        setFile(fileBlob);
    }

    const  [ handleUpdate, {error : updateError} ]  = useMutation(UPDATE_ARTICLE, {
        variables : {
            id : articleId,
            editTitle : articles.title,
            editContext : articles.context,
            editDate : editDate,
            editImg_file : editImg_file
        },
        onCompleted : () => {
            alert("게시글 수정 완료");
            navigate(`/article/${articleId}`)
        }
    });

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
                        <span><input name="title" value={articles.title} onChange={handleChange}/></span>
                        <div>
                            <span>{articles?.username} | </span>
                            <span>{convertDate(+`${articles?.createdAt}`)}</span>
                        </div>
                    </EditArticleTitle>
                </EditArticleImgBox>
                <ArticleSection>
                    <ArticleContext><textarea name="context" value={articles.context} onChange={handleChange}/></ArticleContext>
                </ArticleSection>
            </ArticleBox>
            <EditButtonBox>
                <button onClick={() => handleCancel()}>CANCEL</button>
                <button onClick={() => handleUpdate()}>SAVE</button>
            </EditButtonBox>
        </ArticleWrapper>
    )
}

export default React.memo(EditArticle)

