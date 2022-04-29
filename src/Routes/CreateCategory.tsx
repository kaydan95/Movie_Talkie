import React, {useEffect, useState} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CATEGORY, CREATE_NEW_ACCESSTOKEN } from '../Graphql/Mutation';
import { CateFormBox, CateFormSection, CateImg, CateInfoForm, CreateCateBtn, CreateCateWrapper, FormBox, FormBoxWrapper, GenreTag, MovieSearchBox, MovieSearchBoxImg, MovieSearchSection } from '../Styles/CreateCateStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchSection } from '../Styles/HeaderStyle';
import { useForm } from 'react-hook-form';
import { GET_MOVIE_DETAIL, GET_MOVIE_SEARCH_RESULTS, GET_USER } from '../Graphql/Queries';
import { makeImage } from '../util';
import { useLocation, useNavigate } from 'react-router-dom';
import { ILocation } from './Main';


//interface

interface IMovieType {
    id : number;
    backdrop_path : string;
    original_language : string;
    original_title :string;
    overview : string;
    release_date : string;
    title : string;
}

interface ICateSearchForm {
    moviename : string;
}

export interface IGenre {
    id : number;
    name : string;
}

function CreateCategory() {

    const [movieName, setMovieName] = useState("");
    const [cateSearchPage, setPage] = useState(1);
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    // 유저정보 확인 후 accessToken 발급하기
    const { data : userData, refetch } = useQuery(GET_USER, {
        onCompleted : (data) => {
            setUserId(data?.getUser?.id);
            setToken(data?.getUser?.token);
            return {
                userId, token
            }

        }
    });
    // const userId = userData?.getUser?.id;
    // const token = userData?.getUser?.token;
    const [ createToken, {data} ] = useMutation(CREATE_NEW_ACCESSTOKEN, {
        onCompleted : (data) => {
            return data;
        }
    });


    console.log(userData)

    // 영화 검색
    const [searchTitle, setSearchTitle] = useState("Search Movie to Make Category")
    const {register, handleSubmit, setValue} = useForm<ICateSearchForm>();
    const onSearchValid = (searchData:ICateSearchForm) => {
        setMovieName(searchData.moviename);
        setValue("moviename", "");
    }
    const { loading, data : CateSearch } = useQuery(GET_MOVIE_SEARCH_RESULTS, {
        variables : {keyword : movieName, page : cateSearchPage},
    });
    const cateSearchResult = CateSearch?.getMovieSearchResults?.results;


    // 검색 후 검색 영역 타이틀 변경
    useEffect(() => {
        if(userId != null) {
            createToken({
                variables : {
                    id : userId,
                    refreshToken : token
                }
            });
        }
        if(movieName !== ""){
            setSearchTitle("Here is result of " + `${movieName}`);
        }
    },[userId, movieName]);

    const location = useLocation() as ILocation;
    console.log(location.state);

    console.log(data?.createNewAccessToken)



    //영화 선택 후 -> From에 정보 반영
    const [movieId, setMovieId] = useState(0);
    const selectMovie = (id : number) => {
        setMovieId(id);
    }
    const { data : movieDetail } = useQuery(GET_MOVIE_DETAIL, {
        variables : {id : movieId},
    })
    const Detail = movieDetail?.getMovieDetail;


    // 카테고리 생성
    const [addCategory, {error}] = useMutation(ADD_CATEGORY, {
        variables : {
            id : Detail?.id, 
            category_title : Detail?.original_title,
            category_releaseDate : Detail?.release_date,
            category_imgPath : Detail?.backdrop_path,
        },
        context : {
            headers : {
                authorization: `Bearer ${data?.createNewAccessToken?.accessToken}`,
                "Content-Type": "application/json",
            }
        },
        onCompleted : () => {
            if(!error) {
                alert(`${Detail?.original_title}` + " 카테고리 생성완료");
                navigate(`/`, {replace : true, state : { isLogged : true}});
            }
        },
        onError : () => {
            alert("이미 존재하는 카테고리 입니다.");
        }
    });

    return (
        <>
            <CreateCateWrapper>
                <CateFormSection>
                    <h1>Create New Category</h1>
                    <CateFormBox>
                        <CateImg bgphoto={makeImage(Detail?.backdrop_path, "w500")}/>
                        <CateInfoForm>
                            <SearchSection style={{marginBottom : '10px'}} onSubmit={handleSubmit(onSearchValid)}>
                                <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
                                <input
                                    {...register("moviename", {required : true, minLength : 2})}
                                    placeholder='search movie to make category'
                                />
                            </SearchSection>
                            <FormBoxWrapper>
                                <p>Movie Title</p>
                                <FormBox>
                                    <input 
                                        readOnly 
                                        placeholder='Movie Original Title' 
                                        value={Detail?.original_title} 
                                    />
                                </FormBox>
                            </FormBoxWrapper>
                            <div style={{display : 'inline-flex'}}>
                                <FormBoxWrapper style={{width : '35%', marginRight : '10px'}}>
                                    <p>Release Date</p>
                                    <FormBox>
                                        <input readOnly placeholder='Release Date' value={Detail?.release_date}/>
                                    </FormBox>
                                </FormBoxWrapper>
                                <FormBoxWrapper style={{width : '35%', marginRight : '10px'}}>
                                    <p>Runtime</p>
                                    <FormBox>
                                        {Detail?.runtime !== null ? (
                                            <span>{Math.floor(+`${Detail?.runtime}` / 60)}H {Math.floor(+`${Detail?.runtime}` % 60)}M</span>
                                        ) : (
                                            <input readOnly placeholder='runtime'/>
                                        )}
                                        
                                    </FormBox>
                                </FormBoxWrapper>
                                <FormBoxWrapper style={{width : '28%'}}>
                                    <p>Category Id</p>
                                    <FormBox>
                                        <input readOnly placeholder='id' value={Detail?.id}/>
                                    </FormBox>
                                </FormBoxWrapper>
                            </div>
                            <FormBoxWrapper>
                                <p>Genres</p>
                                <div style={{display : 'inline-flex'}}>
                                    {Detail?.genres?.map((genre :IGenre) => (
                                        <GenreTag key={genre.id}>{genre.name}</GenreTag>
                                    ))}
                                </div>
                            </FormBoxWrapper>
                        </CateInfoForm>
                    </CateFormBox>
                    <CreateCateBtn onClick={() => addCategory()}>
                        Add Category
                    </CreateCateBtn>
                </CateFormSection>
                <MovieSearchSection>
                    <h1>{searchTitle}</h1>
                    {cateSearchResult?.map((result:IMovieType) => (
                        <MovieSearchBox key={result.id} className='SearchBox' onClick={() => selectMovie(result.id)}>
                            <p className='id'>{result.id}</p>
                            {result.backdrop_path !== null ? (
                                <MovieSearchBoxImg bgphoto={makeImage(result.backdrop_path, "w300")}/>
                            ) : (
                                <p className='noImage'>NO IMAGE</p>
                            )}
                            {result.release_date !== "" ? (
                                <p className='title'>{result.original_title} ({result.release_date.slice(0,4)})</p>
                            ) : (
                                <p className='title'>{result.original_title}</p>
                            )}
                            <p className='runtime'>{result.original_language}</p>
                        </MovieSearchBox>
                    ))}
                </MovieSearchSection>
            </CreateCateWrapper>
        </>

    )
}

export default CreateCategory
