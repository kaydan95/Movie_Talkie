import {gql} from "@apollo/client";

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
// 영화 전체 목록 호출
// 해당 영화 하나에 대한 정보 호출 -> 아이디나 영화 제목으로 구분
