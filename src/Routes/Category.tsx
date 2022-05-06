import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { CREATE_NEW_ACCESSTOKEN } from '../Graphql/Mutation';
import {GET_ALL_CATE_ARTICLES, GET_MOVIE_CREDITS, GET_MOVIE_DETAIL, GET_USER} from '../Graphql/Queries';
import { Article, CateArticleSection, CateArticlesList, CateArticleTitle, CateDetailBox, CateDetailInfo, CateDetailInfoBox, CateDetailSection, CateDetailThumbnail, CateName, CateWrapper } from '../Styles/CategoryStyle';
import { GenreTag } from '../Styles/CreateCateStyle';
import { makeImage } from '../util';
import { IGenre } from './CreateCategory';
import { Helmet } from 'react-helmet';

interface ICredit {
    name : string;
    original_name : string;
    department : string;
    job : string;
}

interface IArticleType {
    id : number;
    title : string;
    username : string;
    createdAt : string;
}

function Category() {

    const navigate = useNavigate();
    const catePathMatch = useMatch("/category/:cateId");
    const cateId = Number(catePathMatch?.params.cateId);

    // user  정보 확인 후 accessToken 발급
    const { data : userData, refetch : userRefetch } = useQuery(GET_USER);
    const userId = userData?.getUser?.id;
    const token = userData?.getUser?.token;
    const [isLogged, setIsLogged] = useState(false)
    const [ createToken, {data} ] = useMutation(CREATE_NEW_ACCESSTOKEN, {
        onCompleted : () => {
            setIsLogged(true)
        }
    });

    // 글 목록 호출
    function convertDate(milliSecond : number) {
        const data = new Date(milliSecond);  //Date객체 생성

        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
    
        return `${year}-${month}-${date}`;
    }
    const [articleList, setArticleList] = useState([]);
    const { loading, error, data : cateData, refetch : articleRefetch } = useQuery(GET_ALL_CATE_ARTICLES, {
        variables : {category : cateId},
        onCompleted : (data) => {
            setArticleList(data?.getAllCateArticles)
        }
    });


    // 영화 디테일 정보
    const [isSplit, setIsSplit] = useState(false);
    const { data : cateDetail } = useQuery(GET_MOVIE_DETAIL, {
        variables : {id : cateId},
    });
    const cateInfoDetail = cateDetail?.getMovieDetail;
    const cateInfoTitle = cateDetail?.getMovieDetail?.original_title?.split(":");
    

    // 영화 cast, crew Detail
    const { data : cateCredit } = useQuery(GET_MOVIE_CREDITS, {
        variables : {id : cateId},
    });
    const cateCreditData = cateCredit?.getMovieCredits;
    const MovieDirector = cateCreditData?.crew?.filter((dir:ICredit) => {
        if(dir.job === "Director"){
            return dir;
        }
    });


    useEffect(() => {
        articleRefetch();
        if(userId !== "") {
            createToken({
                variables : {
                    id : userId,
                    refreshToken : token
                }
            });
        }
        if(userData?.geUser == null && data?.createNewAccessToken == null) {
            setIsLogged(false);
        }
        userRefetch();
        if(cateInfoDetail?.original_title?.includes(":")){
            setIsSplit(true);
        }
    }, [userId]);

    // 글쓰기페이지로 이동
    const goPost = (cateId : number) => {
        if(isLogged === true) {
            navigate(`/postarticle/${cateId}`, {state : { isLogged : isLogged }});
        }
        else {
            alert("Members Only");
            navigate(`/login`);
        }
    }

    // 해당 게시글 클릭
    const goArticle = (articleId : number) => {
        navigate(`/category/${cateId}/article/${articleId}`);
    }


    return (
        <CateWrapper>
            <Helmet>
                <title>{cateInfoDetail?.original_title}</title>
            </Helmet>
            <CateDetailSection>
                <CateName>Category Info</CateName>
                <CateDetailBox>
                    <CateDetailThumbnail bgphoto={makeImage(cateInfoDetail?.backdrop_path, "w500")}>
                        {isSplit ? (
                            <div style={{display : 'flex', flexDirection : 'column'}}>
                                <span>{cateInfoTitle[0]} : </span>
                                <span>{cateInfoTitle[1]} ({cateInfoDetail?.release_date !== "" 
                            ? (cateInfoDetail?.release_date.slice(0,4)) : null})</span>
                            </div>
                        ) : (
                            <span>{cateInfoDetail?.original_title} ({cateInfoDetail?.release_date !== "" 
                            ? (cateInfoDetail?.release_date.slice(0,4)) : null})</span>
                        )}
                    </CateDetailThumbnail>
                    <CateDetailInfo>
                        <CateDetailInfoBox>
                            <span>Director</span>
                            <div className='infobox'>
                                {MovieDirector?.map((dir:ICredit) => (
                                    <p key={dir?.original_name}>{dir?.original_name} <span>&</span> </p>
                                ))}
                            </div>
                        </CateDetailInfoBox>
                        <CateDetailInfoBox>
                            <span>Cast</span>
                            <div className='infobox'>
                                {cateCreditData?.cast?.slice(0,2).map((cast:ICredit) => (
                                    <p key={cast.original_name}>{cast.original_name} <span>/</span></p> 
                                ))} <p>...and more</p>
                            </div>
                        </CateDetailInfoBox>
                        <CateDetailInfoBox>
                            <span>Overview</span>
                            {cateInfoDetail?.overview.length < 250 ? (
                                <p>{cateInfoDetail?.overview}</p>
                            ) : (
                                <p>{cateInfoDetail?.overview.slice(0,250)}...</p>
                            )}
                        </CateDetailInfoBox>
                        <CateDetailInfoBox>
                            <span>Genre</span>
                            <div className='infobox'>
                                {cateInfoDetail?.genres?.map((gen :IGenre) => (
                                    <GenreTag key={gen.id} style={{fontSize : '0.8rem', fontWeight : 'normal'}}>{gen.name}</GenreTag>
                                ))}
                            </div>
                        </CateDetailInfoBox>
                    </CateDetailInfo>
                </CateDetailBox>
            </CateDetailSection>
            <CateArticleSection>
                <CateArticleTitle>
                    <CateName>Articles</CateName>
                    <button onClick={() => goPost(cateId)}>post</button>
                </CateArticleTitle>
                <CateArticlesList>
                    {articleList?.map((article : IArticleType) => (
                        <Article key={article.id} onClick={() => goArticle(article.id)}>
                            <span className='postId'>{article.id}</span>
                            <span className='title'>{article.title}</span>
                            <span className='username'>{article.username}</span>
                            <span className='date'>{convertDate(+article.createdAt)}</span>
                        </Article>
                    ))}
                </CateArticlesList>
            </CateArticleSection>
        </CateWrapper>
    )
}

export default Category;

