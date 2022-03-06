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
// 영화 카테고리 상관 없이 모든 게시물 호출
export const GET_ALL_ARTICLES = gql`

    query getAllArticles {
        getAllArticles {
            username
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
            username
            title
            context
            img_file
            createdAt
        }
    }
`

// 해당 게시물 정보 호출
export const GET_ARTICLE = gql`

    query getArticle($id : ID!) {
        getArticle(id : $id) {
            username
            title
            context
            img_file
            createdAt
        }
    }
`

