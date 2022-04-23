import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import {GET_ARTICLE, GET_MOVIE_CREDITS, GET_MOVIE_DETAIL} from '../Graphql/Queries';
import { CateArticleSection, CateArticlesList, CateArticleTitle, CateDetailBox, CateDetailInfo, CateDetailInfoBox, CateDetailSection, CateDetailThumbnail, CateName, CateWrapper } from '../Styles/CategoryStyle';
import { GenreTag } from '../Styles/CreateCateStyle';
import { makeImage } from '../util';
import { IGenre } from './CreateCategory';

interface ICredit {
    name : string;
    original_name : string;
    department : string;
    job : string;
}

function Category() {

    const navigate = useNavigate();
    const catePathMatch = useMatch("/category/:cateId");
    const cateId = Number(catePathMatch?.params.cateId);
    const [isSplit, setIsSplit] = useState(false);
    const { data : cateDetail } = useQuery(GET_MOVIE_DETAIL, {
        variables : {id : cateId},
    });
    const cateInfoDetail = cateDetail?.getMovieDetail;
    const cateInfoTitle = cateDetail?.getMovieDetail?.original_title?.split(":");

    useEffect(() => {
        if(cateInfoDetail?.original_title?.includes(":")){
            setIsSplit(true);
        }
    });

    const { data : cateCredit } = useQuery(GET_MOVIE_CREDITS, {
        variables : {id : cateId},
    });
    const cateCreditData = cateCredit?.getMovieCredits;

    const MovieDirector = cateCreditData?.crew?.filter((dir:ICredit) => {
        if(dir.job === "Director"){
            return dir;
        }
    });

    // 글쓰기
    const goPost = (cateId : number) => {
        navigate(`/postarticle/${cateId}`);
    }

    const { loading, error, data : cateData } = useQuery(GET_ARTICLE, {
        variables : {id : cateId},
    });

    return (
        <CateWrapper>
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
                                    <p>{dir?.original_name} <p>&</p> </p>
                                ))}
                            </div>
                        </CateDetailInfoBox>
                        <CateDetailInfoBox>
                            <span>Cast</span>
                            <div className='infobox'>
                                {cateCreditData?.cast?.slice(0,2).map((cast:ICredit) => (
                                    <p>{cast.original_name} <p>/</p></p> 
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
                                    <GenreTag style={{fontSize : '0.8rem', fontWeight : 'normal'}}>{gen.name}</GenreTag>
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
                </CateArticlesList>
            </CateArticleSection>
        </CateWrapper>
    )
}

export default Category;

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