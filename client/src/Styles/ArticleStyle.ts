import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ArticleWrapper = styled.div`
    width : 100%;
    height : fit-content;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding : 10px;
    overflow-x: hidden;
`

export const ArticleBox = styled.div`
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    width : 70%;
    height : fit-content;
    display : flex;
    flex-direction: column;
    overflow: hidden;
`

export const ArticleImgBox = styled.div<{bgphoto : string}>`
    width : 100%;
    height : 400px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24,0.5)), url(${props => props.bgphoto});
    background-position: 50% 40%;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    display: flex;
    .barsIcon{
        align-items: flex-end;
        font-size : 2rem;
        color : ${props => props.theme.base.background};
        position: absolute;
        right: 10px;
        margin: 20px;
        z-index: 0;
        cursor : pointer;
    }
`

export const ArticleTitle = styled.div`
    padding : 20px;
    height : 100%;
    width : 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color : ${props => props.theme.base.background};
    span {
        font-size: 1.5rem;
    }
    div {
        span {
            font-size: 1.1rem;
        }
    }
`

export const ArticleSection = styled.div`
    width : 100%;
    height : fit-content;
    display : flex;
    flex-direction: column;
`

export const ArticleContext = styled.div`
    padding : 20px;
    white-space: pre-line;
    color : ${props => props.theme.base.main};
    width : 100%;
    font-size: 1.2rem;
    height : fit-content;
    background-color: ${props => props.theme.base.background};
    textarea {
        white-space: pre-wrap;
        border-radius: 5px;
        padding : 5px;
        border : 0.8px solid ${props => props.theme.base.subOne};
        font-size: 1.1rem;
        width : 100%;
        height : 500px;
        &:focus {
            outline: none;
        }
    }
`

export const BeforeGoEditModal = styled(motion.div)`
    width : 100%;
    background-color: rgba(255,255,255,0.9);
    position: absolute;
    top : 0;
    left : 0;
    display : flex;
    flex-wrap: nowrap;
    flex-direction: column;
`

export const CancelIconBox = styled.div`
    overflow: hidden;
    display : flex;
    justify-content: flex-end;
    .closeIcon {
        color : ${props => props.theme.base.subTwo};
        font-size: 3rem;
        margin : 40px;
        &:hover {
            cursor : pointer;
            color : ${props => props.theme.base.subOne};
        }
    }
`

export const EditArticleImgBox = styled.div<{bgphoto : string}>`
    width : 100%;
    height : 400px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24,0.5)), url(${props => props.bgphoto});
    background-position: 50% 40%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    .fileUploadBox {
        height : 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        label {
            cursor : pointer;
            font-size: 2rem;
            opacity : 0.5;
            color : ${props => props.theme.base.background};
        }
        input[type="file"]{
            display: none;
        }
    }
`

export const EditArticleTitle = styled(ArticleTitle)`
    height : fit-content;
    input {
            font-size: 1.5rem;
            padding : 5px;
            color : ${props => props.theme.base.background};
            background: transparent;
            border : none;
            border-bottom: 0.8px solid white;
            width : 800px;
            &:focus {
                outline: none;
            }
        }
`

export const EditButtonBox = styled.div`
    width : 70%;
    display: flex;
    justify-content: flex-end;
    padding : 20px 10px;
    button {
        border : none;
        font-size: 0.8rem;
        margin-right: 5px;
        border-radius: 10px;
        height : 30px;
        width : 100px;
        font-size: 1rem;
        background-color: ${props => props.theme.base.subTwo};
        color : ${props => props.theme.base.main};
        &:hover {
            cursor : pointer;
            color : ${props => props.theme.base.background};
            background-color: ${props => props.theme.base.subOne};
        }
    }
`
