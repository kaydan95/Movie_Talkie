import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { GET_MOVIE_SEARCH_RESULTS } from '../Graphql/Queries';
import { makeImage } from '../util';

const ResultTitle = styled.h1`
    font-size: 3rem;
    padding : 40px 40px 20px 40px;
    font-weight: bold;
    color : ${props => props.theme.base.subOne};
    span {
        color : ${props => props.theme.base.main};
        font-style : italic;
    }
`

const MovieSearchWrapper = styled.div`
    width : 100%;
    height : fit-content;
    display: grid;
    padding : 20px;
    grid-template-columns: repeat(5, 1fr);
`

const MovieBox = styled.div`
    width : 260px;
    height : fit-content;
    display: flex;
    flex-direction: column;
    margin : 0px 20px 20px 0px;
    overflow: hidden;
    border-radius : 8px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    &:hover {
        cursor: pointer;
        transition : 0.3s;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`

const MovieImg = styled.div<{bgphoto : string}>`
    height : 160px;
    background-image: url(${props => props.bgphoto});
    background-position: 50%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;
    span {
        margin : 10px 10px 0px 0px;
        color : ${props => props.theme.base.main};
        font-weight : bold;
        font-size : 1.5rem;
        border-radius: 5px;
        background-color: rgba(219,226,239,0.5);
        height : fit-content;
        padding : 5px;
        text-transform : uppercase;
    }
`

const NonMovieImg = styled.div`
    height : 160px;
    background-color: rgba(63, 114, 175,0.3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    p{
        color : ${props => props.theme.base.subTwo};
        text-align: center;
        height : fit-content;
        font-weight : bold;
    }
    span {
        position: absolute;
        top: 0;
        right :0;
        margin : 10px 10px 0px 0px;
        color : ${props => props.theme.base.main};
        font-weight : bold;
        font-size : 1.5rem;
        border-radius: 5px;
        background-color: rgba(219,226,239,0.5);
        height : fit-content;
        padding : 5px;
        text-transform : uppercase;
    }
`

const MovieInfo = styled.div`
    padding : 20px;
    height : 80px;
    display : inline-flex;
    align-items: center;
    color : ${props => props.theme.base.main};
    font-size: 1.1rem;
    font-weight: bold;
`

interface IMovieType {
    id : number;
    backdrop_path : string;
    original_language : string;
    original_title :string;
    overview : string;
    release_date : string;
    title : string;
}

interface ISearchType {
    results : IMovieType[]
}



function MovieSearch() {



    const loaction = useLocation();
    const keyword = new URLSearchParams(loaction.search).get("keyword");

    const [movieKeyword, setKeyword] = useState(keyword);

    console.log(keyword);

    const [searchPage, setPage] = useState(1);

    useEffect(() => {
        setKeyword(keyword);
    },[keyword])

    const { loading, error, data : movieSearch } = useQuery(GET_MOVIE_SEARCH_RESULTS, {
        variables : {keyword : movieKeyword, page : searchPage},
    });

    const movies = movieSearch?.getMovieSearchResults?.results;

    return (
        <>
            <ResultTitle>Here are All Results of <span>"{movieKeyword}"</span></ResultTitle>
            <MovieSearchWrapper>
                {movies?.map((movie:IMovieType) => (
                        <MovieBox>
                            {movie.backdrop_path !== null ? (
                                <MovieImg bgphoto={makeImage(movie.backdrop_path, "w300")}>
                                    <span>
                                        {movie.original_language}
                                    </span>
                                </MovieImg>
                            ) : (
                                <NonMovieImg>
                                    <p>NO IMAGE</p>
                                    <span>
                                        {movie.original_language}
                                    </span>
                                </NonMovieImg>
                            )}

                        <MovieInfo>
                            {movie.release_date !== null ? (
                                <span>{movie.original_title} ({movie.release_date?.slice(0,4)})</span>
                            ) : (
                                <span>{movie.original_title}</span>
                            )}
                        </MovieInfo>
                    </MovieBox> 
                ))}
            </MovieSearchWrapper>
        </> 
    )
}

export default MovieSearch