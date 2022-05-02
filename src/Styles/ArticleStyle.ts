import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ArticleWrapper = styled.div`
    width : 100%;
    height : fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding : 10px;
    overflow-x: hidden;
`

export const ArticleBox = styled.div`
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
    width : 70%;
    height : 100%;
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
        z-index: 1;
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
    color : ${props => props.theme.base.main};
    width : 100%;
    height : fit-content;
    background-color: ${props => props.theme.base.background};
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
