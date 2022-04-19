import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import {GET_ARTICLE} from '../Graphql/Queries';

function ListOfArticles() {

    let cate_id = 1;

    const [articles, setArticles] = useState({
        title : " ",
        context : " ",
        img_file : " ",
        username : " ",
        createdAt : " ",
    })

    const { loading, error } = useQuery(GET_ARTICLE, {
        variables : {id : cate_id},
        onCompleted : (data) => {
            if(cate_id === 0) {
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

    return (
        <div>
            <h1>Here is Articles</h1>
            <div>
                {articles && (<div>
                    <span>title : <input name="title" value={articles.title} onChange={handleChange}/></span><br/>
                    <span>context : <input name="context" value={articles.context} onChange={handleChange}/></span><br/>
                    <img src={articles.img_file}/><br/>
                    <span>username : <input name="username" value={articles.username} onChange={handleChange}/></span><br/>
                    <span>created at : <input name="createdAt" value={articles.createdAt} onChange={handleChange}/></span>
                </div>)}
                <button>Delete Article</button>
                <button>Edit Article</button>
            </div>
        </div>
    )
}

export default ListOfArticles;