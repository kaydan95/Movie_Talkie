import {GET_ALL_USER} from '../Graphql/Queries';
import {useNavigate} from 'react-router-dom';
import ListOfUsers from '../Components/ListOfUsers';
import {useQuery} from '@apollo/client';
import { MainWrapper } from '../Styles/MainStyle';

function Main() {
    let navigate = useNavigate();
    
    const { data } = useQuery(GET_ALL_USER);

    return (
        <MainWrapper>
            <h1>THIS IS MAIN PAGE</h1>


            {/* 영화 큐카드 component 생성 후 영화 갯수만큼 불러오기 */}
            {data && data.getAllUsers.map(() => (
                <ListOfUsers/>
            ))}


            <button onClick={()=>{
                navigate("/createuser");
            }}> go to detail page </button>
        </MainWrapper>
    )
}

export default Main
