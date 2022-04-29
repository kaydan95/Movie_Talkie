import {gql} from "@apollo/client";

// 테스트용
export const GET_ALL_USER = gql`
    query getAllUsers {
        getAllUsers {
            id
            name
            username
        }
    }
`

// 필요한 쿼리문

// 현재 로그인한 회원 정보
export const GET_USER = gql`
    query getUser {
        getUser {
            id
            username
            token
        }
    }
`


// 모든 카테고리 호출
export const GET_ALL_CATEGORIES = gql`
    query getAllCategories {
        getAllCategories {
            id
            category_title
            category_releaseDate
            category_imgPath
        }
    }
`

// 카테고리 검색 후 해당 카테고리 호출
export const GET_SEARCHED_CATEGORIES = gql`
    query getAllSearchedCategories(
        $category_title : String!
    ) {
        getAllSearchedCategories(
            category_title : $category_title
        ) {
            id
            category_title
            category_releaseDate
            category_imgPath
        }
    }
`


// 영화 카테고리 상관 없이 모든 게시물 호출
export const GET_ALL_ARTICLES = gql`
    query getAllArticles {
        getAllArticles {
            title
            img_file
            createdAt
        }
    }
`

// 해당 영화 카테고리에 맞는 게시물 모두 호출
export const GET_ALL_CATE_ARTICLES = gql`
    query getAllCateArticles($category : ID!) {
        getAllCateArticles(category : $category) {
            id
            title
            username
            createdAt
        }
    }
`

// 해당 게시물 정보 호출
export const GET_ARTICLE = gql`
    query getArticle($id : ID!) {
        getArticle(id : $id) {
            userid
            title
            context
            img_file
            createdAt
        }
    }
`

// 카테고리 추가시 영화 검색 결과 호출
export const GET_MOVIE_SEARCH_RESULTS = gql`
    query getMovieSearchResults(
        $keyword : String!
        $page : Int!
    ) {
        getMovieSearchResults(
            keyword : $keyword
            page : $page
        ) {
            results {
                id
                backdrop_path
                original_language
                original_title
                overview
                release_date
                title
            }
        }
    }
`

//  영화 디테일 정보
export const GET_MOVIE_DETAIL = gql`
    query getMovieDetail(
        $id : Int!
    ) {
        getMovieDetail(
            id : $id
        ) {
            id
            backdrop_path
            original_language
            original_title
            overview
            release_date
            runtime
            title
            genres {
                id
                name
            }
        }
    }
`

//  영화 cast, crew 정보
export const GET_MOVIE_CREDITS = gql`
    query getMovieCredits(
        $id : Int!
    ) {
        getMovieCredits(
            id : $id
        ) {
            id
            cast {
                name
                original_name
            }
            crew {
                name
                original_name
                department
                job
            }
        }
    }
`

