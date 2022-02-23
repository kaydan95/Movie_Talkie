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

// 필요한 뮤테이션
// 영화 등록
// 영화 하나에 대한 정보 수정
// 영화 하나에 대한 삭제