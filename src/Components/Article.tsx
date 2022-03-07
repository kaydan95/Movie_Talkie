import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { GET_ARTICLE } from '../Graphql/Queries';
import { DELETE_ARTICLE } from '../Graphql/Mutation'

function Article() {

    let article_id = 3;

    const [articles, setArticles] = useState({
        title : " ",
        context : " ",
        img_file : " ",
        username : " ",
        createdAt : " ",
    })

    const { loading, error } = useQuery(GET_ARTICLE, {
        variables : {id : article_id},
        onCompleted : (data) => {
            if(article_id === 0) {
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
        setArticles({
            ...articles,
            [name] : value
        })
    }

    const [password, confirmPassword] = useState(" ");

    const  [ handleDelete, {error : deleteError} ]  = useMutation(DELETE_ARTICLE);

    return (
        <div>
            <h1>Here is Articles</h1>
            <input type="text" onChange={(event)=>{
                confirmPassword(event?.target.value);
            }}></input>
            <button onClick={()=>{
                handleDelete({variables : {id : article_id, password : password}});

            }}>Delete Article</button><br/>
            <button>Edit Article</button>
            <div>
                {articles && (<div>
                    <span>title : <input name="title" value={articles.title} onChange={handleChange}/></span><br/>
                    <span>context : <input name="context" value={articles.context} onChange={handleChange}/></span><br/>
                    <img src={articles.img_file}/><br/>
                    <span>username : <input name="username" value={articles.username} onChange={handleChange}/></span><br/>
                    <span>created at : <input name="createdAt" value={articles.createdAt} onChange={handleChange}/></span>
                </div>)}
            </div>
        </div>
    )
}

export default Article

