import {gql} from "@apollo/client";

export const CREATE_USER = gql`

    mutation createUser(
        $name : String! 
        $username : String! 
        $password : String!
        ) {
        createUser(
            name : $name 
            username : $username 
            password : $password
            ) {
                id
                name
                username
            }
    }

`

export const DELETE_USER = gql`

    mutation deleteUser(
        $id : ID! ) {
        deleteUser(
            id : $id 
            ) {
                message
            }
    }

`

export const UPDATE_PASSWORD = gql`

    mutation updatePassword(
        $username : String!
        $oldPassword : String!
        $newPassword : String! ) {
        updatePassword(
            username : $username
            oldPassword : $oldPassword
            newPassword : $newPassword
            ) {
                message
            }
    }

`

export const POST_ARTICLE = gql`
    
    mutation postArticle(
        $username : String!
        $password : String!
        $title : String!
        $context : String!
        $img_file : FileUpload
        $category : ID!
    ) {
        postArticle(
            username : $username
            password : $password 
            title : $title
            context : $context
            img_file : $img_file
            category : $category
        ) {
            message
        }
    
    }

`

export const ADD_CATEGORY = gql`
    
    mutation addCategory(
        $category_title : String!
        $category_img : FileUpload!
    ) {
        addCategory(
            category_title : $category_title
            category_img : $category_img 
        ) {
            message
        }
    
    }

`




// 필요한 뮤테이션
// 영화 등록 -> 완료
// 영화 하나에 대한 정보 수정 -> 비번 확인하고 해야함 -> 사진도? 아니면 내용만?
// 영화 하나에 대한 삭제 -> 비번확인하고 해야함 -> 삭제