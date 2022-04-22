import styled from 'styled-components';
import Header from '../Components/Header';

export const CreateCateWrapper = styled.div`
    width: 100%;
    height : 90vh;
    padding : 20px 40px;
    display: grid;
    grid-template-columns: 30% 70%;
`

export const CateFormSection = styled.div`
    /* border : 1px solid green; */
    display: flex;
    flex-direction: column;
    padding : 10px;
    h1 {
        font-size: 1.3rem;
        color: ${props => props.theme.base.main};
        margin: 20px;
        font-weight: bold;
    }
`

export const CateFormBox = styled.div`
    /* border : 1px solid blue; */
    border-radius: 15px;
    overflow: hidden;
    overflow: hidden;
    height : 510px;
    width : 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
`

export const CateImg = styled.div<{bgphoto : string}>`
    width : 100%;
    height : 180px;
    background-image: url(${props => props.bgphoto});
    background-position: 50% 30%;
    background-repeat: no-repeat;
`

export const CateInfoForm = styled.div`
    height : 300px;
    display: flex;
    flex-direction: column;
    padding : 20px;
`

export const CateForm = styled.div`
    border : 1px solid ${props => props.theme.base.subOne};
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FormBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    p {
        font-size: 0.9rem;
        margin : 0px 0px 5px 5px;
        color: ${props => props.theme.base.main};
    }
`

export const FormBox = styled.div`
    border : 1px solid ${props => props.theme.base.subOne};
    border-radius: 10px;
    padding : 10px;
    input {
        border : none;
        width: 100%;
        background-color: transparent;
        color : ${props => props.theme.extra.black};
        &:focus {
            outline: none;
        }
    }
    span {
        width: 100%;
        font-size: 0.9rem;
        background-color: transparent;
        color : ${props => props.theme.extra.black};
    }
`

export const GenreTag = styled.span`
    border : 1px solid ${props => props.theme.base.subTwo};
    background-color: rgba(219,226,239,0.5);
    color : ${props => props.theme.base.main};
    font-size: 0.8rem;
    margin-right: 5px;
    border-radius: 10px;
    padding : 10px;
`

export const CreateCateBtn = styled.button`
    border : 1px solid ${props => props.theme.base.subOne};
    background-color: transparent;
    padding : 10px;
    margin-top: 20px;
    border-radius: 10px;
    color: ${props => props.theme.base.main};
    font-size: 1.1rem;
    &:hover {
        transition: 0.2s;
        background-color: rgba(219,226,239,0.5);
        cursor: pointer;
    }
`

export const MovieSearchSection = styled.div`
    padding : 15px 15px 15px 20px;
    display: flex;
    flex-direction: column;
    overflow-y : scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    h1 {
        font-size: 1.3rem;
        margin: 10px 0px 10px 10px;
        color: ${props => props.theme.base.main};
        font-weight: bold;
    }
`

export const MovieSearchBox = styled.div`
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
    width : 100%;
    height : 150px;
    border-radius: 10px;
    margin: 10px 0px;
    display: grid;
    padding : 20px 10px;
    color: ${props => props.theme.base.main};
    grid-template-columns: 10% 25% 54% 10%;
    align-items: center;
    p{
        height : 100%;
        display: flex;
        align-items: center;
    }
    .id, .runtime {
        justify-content: center;
    }
    .runtime {
        text-transform: uppercase;
        font-size: 1.1rem;
        font-weight: bold;
    }
    .title {
        padding-left: 20px;
        font-size: 1.1rem;
        font-weight: bold;
    }
    .noImage {
        display: flex;
        height : 100px;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-radius: 10px;
        background-color: rgba(63, 114, 175,0.2);
    }
    &:hover {
        transition: 0.3s;
        background-color: rgba(219,226,239,0.5);
        cursor: pointer;
    }
`

export const MovieSearchBoxImg = styled.div<{bgphoto : string}>`
    display: flex;
    height : 100px;
    border-radius: 10px;
    align-items: center;
    background-image: url(${props => props.bgphoto});
    background-position: 50% 40%;
    background-repeat: no-repeat;
`

