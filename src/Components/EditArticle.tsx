import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { GET_ARTICLE } from '../Graphql/Queries';
import { DELETE_ARTICLE, UPDATE_ARTICLE } from '../Graphql/Mutation'
import { useMatch } from 'react-router-dom';

function EditArticle() {

    const editArticlePathMatch = useMatch("/editArticle/:articleId");
    const articleId = Number(editArticlePathMatch?.params.articleId);

    const [articles, setArticles] = useState({
        title : " ",
        context : " ",
        img_file : " ",
        username : " ",
        createdAt : " ",
    })

    const { loading, error } = useQuery(GET_ARTICLE, {
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
        console.log(name, value);
        setArticles({
            ...articles,
            [name] : value
        })
    }

    const [password, confirmPassword] = useState(" ");

    const  [ handleDelete, {error : deleteError} ]  = useMutation(DELETE_ARTICLE);

    // const [newPassword, setNewPassword] = useState(" ");

    const [editImg_file, setFile] = useState<File>();

    const fileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }

        console.log(event.target.files[0]);

        setFile(event.target.files[0]);
    }

    const  [ handleUpdate, {error : updateError} ]  = useMutation(UPDATE_ARTICLE);

    return (
        <div>
            <h1>Here is Articles</h1>
            <input type="text" placeholder="veryfiy your pw" onChange={(event)=>{
                confirmPassword(event?.target.value);
            }}></input>
            <button onClick={() => {
                handleDelete({variables : {id : articleId, password : password}});
            }}>Delete Article</button><br/>

            {/* <input type="text" placeholder="set your new pw" onChange={(event)=>{
                setNewPassword(event?.target.value);
            }}></input> */}
            <button onClick={() => {
                console.log(articles.title, articles.context, editImg_file);
                handleUpdate({
                    variables : {
                        id : articleId,
                        confirmPassword : password,
                        editTitle : articles.title,
                        editContext : articles.context,
                        editImg_file : editImg_file
                    }
                });
            }}>Edit Article</button>
            <div>
                {articles && (<div>
                    <span>title : <input name="title" value={articles.title} onChange={handleChange}/></span><br/>
                    <span>context : <input name="context" value={articles.context} onChange={handleChange}/></span><br/>
                    <input type = "file" onChange={fileUpload}></input><img src={articles.img_file}/><br/>
                    <span>username : <input name="username" value={articles.username} onChange={handleChange}/></span><br/>
                    <span>created at : <input name="createdAt" value={articles.createdAt} onChange={handleChange}/></span>
                </div>)}
            </div>
        </div>
    )
}

export default React.memo(EditArticle)

