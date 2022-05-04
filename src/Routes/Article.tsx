import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom';
import { GET_ARTICLE } from '../Graphql/Queries';
import { ArticleBox, ArticleContext, ArticleImgBox, ArticleSection, ArticleTitle, ArticleWrapper, BeforeGoEditModal, CancelIconBox } from '../Styles/ArticleStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAnimation } from 'framer-motion';
import { MenuModal } from '../Styles/HeaderStyle';
import { ModalVars } from '../Components/Header';
import GoEditModal from '../Components/GoEditModal';

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
export interface IArticle {
    title : string;
    context : string;
    img_file : string;
    username : string;
    password : string;
    createdAt : string;
}


function Article() {

    const articlePathMatch = useMatch("/category/:cateId/article/:articleId");
    const cateId = Number(articlePathMatch?.params.cateId);
    const articleId = Number(articlePathMatch?.params.articleId);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const openAni = useAnimation();

    function convertDate(milliSecond : number) {
        const data = new Date(milliSecond);  //Date객체 생성

        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
    
        return `${year}-${month}-${date}`;
    }

    const [article, setArticle] = useState<IArticle>();
    const { data : Article, refetch : articleRefetch } = useQuery(GET_ARTICLE, {
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
        setIsEditModal(true);
    }

    const goDeleteModal = () => {
        setIsDeleteModal(true);
    }

    useEffect(() => {
        articleRefetch();
    })


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
                            <span onClick={goDeleteModal}>DELETE</span>
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
            </ArticleWrapper>

            {isEditModal ? (
                <GoEditModal article={article} modalType={isEditModal} id={articleId} categoryId={cateId}/>
            ) : (
                null
            )}

            {isDeleteModal ? (
                <GoEditModal article={article} modalType={isEditModal} id={articleId} categoryId={cateId}/>
            ) : (
                null
            )}
            
        </>

    )
}

export default Article