import React from 'react'
import MainStyle from '../Styles/main.module.css';
import {GET_ALL_USER} from '../Graphql/Queries';
import {useNavigate} from 'react-router-dom';

import ListOfUsers from './ListOfUsers';
import {useQuery} from '@apollo/client';

function Main() {
    let navigate = useNavigate();
    
    const { data } = useQuery(GET_ALL_USER);

    return (
        <div className={MainStyle.mainWrapper}>
            <h1>THIS IS MAIN PAGE</h1>


            {/* 영화 큐카드 component 생성 후 영화 갯수만큼 불러오기 */}
            {data && data.getAllUsers.map(() => (
                <ListOfUsers/>
            ))}


            <button onClick={()=>{
                navigate("/createuser");
            }}> go to detail page </button>
        </div>
    )
}

export default Main
