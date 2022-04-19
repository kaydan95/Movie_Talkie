import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import styled from 'styled-components'
import { GET_MOVIE_SEARCH_RESULTS } from '../Graphql/Queries';
import { makeImage } from '../util';

const MovieSearchWrapper = styled.div`
    border : 1px solid white;
    width : 100%;
    height : fit-content;
    display : flex;
    flex-direction: column;
    color : white;
`

const MovieBox = styled.div`
    width : 100%;
    height : 100px;
    display: grid;
    padding : 10px;
    grid-template-columns: 30% 65%;
    color : white;
`

const MovieImg = styled.div<{bgphoto : string}>`
    border : 1px solid red;
    background-image: url(${props => props.bgphoto});
    background-position: cetner;
    border-radius: 5px;
    background-repeat: no-repeat;
`

const MovieInfo = styled.div`
    border : 1px solid lightblue;
    display : grid;
    grid-template-columns: 70% 30%;
    justify-content: cetner;
    align-items: center;
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



function MovieSearchResult() {

    const [movieKeyword, setKeyword] = useState("spiderman");

    const [searchPage, setPage] = useState(1);

    const { loading, error, data : movieSearch } = useQuery(GET_MOVIE_SEARCH_RESULTS, {
        variables : {keyword : movieKeyword, page : searchPage},
    });

    const movies = movieSearch?.getMovieSearchResults?.results;

    console.log(movies);

    return (
        <>
            <h1>Here are All Results of {movieKeyword}</h1>
            <MovieSearchWrapper>
                {movies.map((movie:IMovieType) => (
                        <MovieBox>
                        <MovieImg bgphoto={makeImage(movie.backdrop_path, "w200")}></MovieImg>
                        <MovieInfo>
                            <span>
                                {movie.original_title}({movie.release_date.slice(0,4)})
                            </span>
                            <span>
                                {movie.original_language}
                            </span>
                        </MovieInfo>
                    </MovieBox> 
                ))}
            </MovieSearchWrapper>
        </>
    )
}

export default MovieSearchResult