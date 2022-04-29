import styled from 'styled-components';

export const CateWrapper = styled.div`
    width : 100%;
    padding : 10px 20px;
    height : 90vh;
    display: grid;
    grid-template-columns: 30% 70%;
    /* border : 1px solid red; */
`

export const CateDetailSection = styled.div`
    /* border : 1px solid blue; */
    width : 100%;
    height : 100%;
    display: flex;
    flex-direction: column;
`

export const CateName = styled.h1`
    font-size: 1.5rem;
    color: ${props => props.theme.base.main};
    font-weight: bold;
    margin: 10px 0px 10px 20px;
`

export const CateDetailBox = styled.div`
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    width : 100%;
    height : 580px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
`

export const CateDetailThumbnail = styled.div<{bgphoto : string}>`
    width : 100%;
    height : 240px;
    border-bottom: 1px solid purple;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24,0.8)), url(${props => props.bgphoto});
    background-position: 50% 30%;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-end;
    span {
        color : ${props => props.theme.base.background};
        margin : 0px 20px 10px 20px;
        font-size: 1.5rem;
        font-weight: bold;
    }
`

export const CateDetailInfo = styled.div`
    width : 100%;
    height : 340px;
    padding : 20px;
    display: flex;
    flex-direction: column;
`

export const CateDetailInfoBox = styled.div`
    width : 100%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    span {
        font-size: 1.15rem;
        font-weight: bold;
        color : ${props => props.theme.base.main};
        margin-bottom: 10px;
    }
    .infobox {
        display: inline-flex;
        width : 100%;
    }
    p {
        display: inline-flex;
        color : ${props => props.theme.extra.black};
        width : fit-content;
        p{
            margin : 0px 5px;
        }
        &:last-child {
            p{
                display: none;
            }
        }
    }

`

export const CateArticleSection = styled.div`
    /* border : 1px solid green; */
    width : 100%;
    height : 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 0px 10px 0px 20px;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const CateArticleTitle = styled.div`
    width : 100%;
    height : 50px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    button {
        border : 1px solid ${props => props.theme.base.subTwo};
        background-color: rgba(219,226,239,0.5);
        color : ${props => props.theme.base.main};
        font-size: 0.8rem;
        margin-right: 5px;
        border-radius: 10px;
        height : 30px;
        width : 80px;
        font-size: 1rem;
        &:hover {
            cursor: pointer;
            color : ${props => props.theme.base.subOne};
            background-color: rgba(219,226,239,0);
        }
    }
`

export const CateArticlesList = styled.div`
    width : 100%;
    height : 500px;
    /* border : 1px solid red; */
    display : flex;
    flex-direction: column;
    padding: 10px;
`

export const Article = styled.div`
    display : grid;
    grid-template-columns: 8% 72% 10% 10%;
    width : 100%;
    height : 40px;
    margin-bottom: 10px;
    border-bottom: 1px solid grey;
    span {
        /* border : 1px solid red; */
        padding : 10px;
    }
    .username, .date {
        display : flex;
        justify-content : center;
        align-items: center;
    }
`

{/* <div>
    {articles && (<div>
        <span>title : <input name="title" value={articles.title} onChange={handleChange}/></span><br/>
        <span>context : <input name="context" value={articles.context} onChange={handleChange}/></span><br/>
        <img src={articles.img_file}/><br/>
        <span>username : <input name="username" value={articles.username} onChange={handleChange}/></span><br/>
        <span>created at : <input name="createdAt" value={articles.createdAt} onChange={handleChange}/></span>
    </div>)}
    <button>Delete Article</button>
    <button>Edit Article</button>
</div> */}