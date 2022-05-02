import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom';
import { GET_ARTICLE } from '../Graphql/Queries';
import { ArticleBox, ArticleContext, ArticleImgBox, ArticleSection, ArticleTitle, ArticleWrapper, BeforeGoEditModal, CancelIconBox } from '../Styles/ArticleStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAnimation } from 'framer-motion';
import { MenuModal } from '../Styles/HeaderStyle';
import { ModalVars } from '../Components/Header';
import { JoinBox, JoinBtn, JoinFormBoxWrapper, JoinTitle } from './Join';
import { FormBox } from '../Styles/CreateCateStyle';
import { useForm } from 'react-hook-form';

// variants
export const EditModalVars = {
    start : {
        opacity : 0,
        height : 0,
        zIndex : 0,
    },
    activate : {
        opacity : 1,
        zIndex : 2,
        height : '100%',
        transition : {
            duration : 0.1,
        }
    },
    end : {
        height : 0,
        opacity : 0,
        zIndex : 0,
        transition : {
            duration : 0.1,
        }
    }
}

// interface
interface IArticle {
    title : string;
    context : string;
    img_file : string;
    username : string;
    password : string;
    createdAt : string;
}

interface IVerify {
    username : string;
    password : string;
}


function Article() {

    const articlePathMatch = useMatch("/article/:articleId");
    const articleId = Number(articlePathMatch?.params.articleId);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const openAni = useAnimation();
    const openModalAni = useAnimation();

    function convertDate(milliSecond : number) {
        const data = new Date(milliSecond);  //Date객체 생성

        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
    
        return `${year}-${month}-${date}`;
    }

    const [article, setArticle] = useState<IArticle>();
    const { data : Article } = useQuery(GET_ARTICLE, {
        variables : {
            id : articleId
        },
        onCompleted : (data) => {
            setArticle(data?.getArticle);
        }
    });

    
    const OpenClick = () => {
        setIsOpen((prev) => !prev);
        if(isOpen === true) {
            openAni.start("activate");
        }
        if(isOpen === false) {
            openAni.start("start");
        }
    }

    const goEditModal = () => {
        openModalAni.start("activate");
        openAni.start("end");
    }

    const closeModal = () => {
        openModalAni.start("end");
    }


    const {register, handleSubmit, setValue, formState: { errors }} = useForm<IVerify>();

    const onVerifyValid = (data:IVerify) => {
        if(data.username === article?.username && data.password === article?.password){
            navigate(`/editArticle/${articleId}`);
            setValue("username", "");
            setValue("password", "");
        }
        if(data.username !== article?.username && data.password !== article?.password){
            alert("Wrong Username Or Password");
            setValue("username", "");
            setValue("password", "");
        }
    };


    return (
        <>
            <ArticleWrapper>
                <ArticleBox>
                    <ArticleImgBox bgphoto={`${article?.img_file}`}>
                        <FontAwesomeIcon onClick={OpenClick} icon={faEllipsisVertical} className="barsIcon"/>
                        <MenuModal 
                            variants={ModalVars} 
                            initial="start"
                            style={{margin : '0px 20px', zIndex : 2}}                        
                            animate={openAni}
                        >
                            <span onClick={goEditModal}>EDIT</span>
                            <span>DELETE</span>
                        </MenuModal>
                        <ArticleTitle>
                            <span>{article?.title}</span>
                            <div>
                                <span>{article?.username.slice(2)}**** | </span>
                                <span>{convertDate(+`${article?.createdAt}`)}</span>
                            </div>
                        </ArticleTitle>
                    </ArticleImgBox>
                    <ArticleSection>
                        <ArticleContext>{article?.context}</ArticleContext>
                    </ArticleSection>
                </ArticleBox>


                <BeforeGoEditModal variants={EditModalVars} initial="start" animate={openModalAni}>
                    <CancelIconBox>
                        <FontAwesomeIcon onClick={closeModal} icon={faXmark} className="closeIcon"/>
                    </CancelIconBox>
                    <JoinBox 
                        style={{margin : '50px auto', backgroundColor : 'white'}}
                        onSubmit={handleSubmit(onVerifyValid)}
                    >
                        <JoinTitle>VERIFICATION CARD</JoinTitle>
                            <JoinFormBoxWrapper>
                                <p>username</p>
                                <FormBox>
                                    <input 
                                        {...register("username", {required : true, minLength : 4})}
                                        placeholder='username'
                                    />
                                </FormBox>
                                <span className='errorMessage'>
                                    {errors.username?.type === 'required' && "This field is required"}
                                </span>
                            </JoinFormBoxWrapper>
                            <JoinFormBoxWrapper>
                                <p>article password</p>
                                <FormBox>
                                    <input
                                        {...register("password", {required : true, minLength : 4})}
                                        placeholder='article password'/>
                                </FormBox>
                                <span className='errorMessage'>
                                    {errors.password?.type === 'required' && "This field is required"}
                                </span>
                            </JoinFormBoxWrapper>
                            <JoinBtn style={{width : '100%'}} onClick={handleSubmit(onVerifyValid)}>VERIFY</JoinBtn>
                    </JoinBox>
                </BeforeGoEditModal>
            </ArticleWrapper>
        </>

    )
}

export default Article