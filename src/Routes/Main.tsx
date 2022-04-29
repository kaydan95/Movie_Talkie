import {GET_ALL_CATEGORIES, GET_USER} from '../Graphql/Queries';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMutation, useQuery} from '@apollo/client';
import { AllCategoriesWrapper, CateBox, CategoryBoxImg, CategoryInfo, CreateCategoryBox, MainTitle, MainWrapper } from '../Styles/MainStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { makeImage } from '../util';
import { useEffect, useState } from 'react';
import { CREATE_NEW_ACCESSTOKEN } from '../Graphql/Mutation';

interface ICateType {
    id : number;
    category_title : string;
    category_imgPath : string;
    category_releaseDate : string;
}

export interface ILocation {
    hash : string;
    key : string;
    pathname : string;
    search : string;
    state : {
        isLogged : boolean
        preKey : string;
    }
}

function Main() {


    const navigate = useNavigate();

    // 유저정보 확인 후 새로운 accessToken 발급

    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const { data : userData } = useQuery(GET_USER, {
        onCompleted : (data) => {
            setUserId(data?.getUser?.id);
            setToken(data?.getUser?.token);
        }
    });

    const [isLogged, setIsLogged] = useState(false);
    const location = useLocation() as ILocation;
    const [ createToken, {data : accessTokenData} ] = useMutation(CREATE_NEW_ACCESSTOKEN);


    const [cateList, setCateList] = useState([]);
    const { data : AllCates, refetch } = useQuery(GET_ALL_CATEGORIES, {
        onCompleted : (data) => {
            setCateList(data?.getAllCategories);
        }
    });

    // console.log(AllCates?.getAllCategories)

    useEffect(() => {
        refetch();
        if(token != null) {
            if(accessTokenData?.createNewAccessToken == null || undefined) {
                createToken({
                    variables : {
                        id : userId,
                        refreshToken : token
                    }
                });
                setIsLogged(true);
            }
            else {
                setIsLogged(true);
            }
        }
    }, [accessTokenData?.createNewAccessToken]);

    console.log(userData)

    console.log(accessTokenData)

    console.log(location.state);

    console.log(isLogged)

    const goTheCate = (cateId : number) => {
        navigate(`/category/${cateId}`, {state : { isLogged : isLogged }});
    }

    const goCreateCate = () => {
        if(isLogged === true){
            navigate(`/createCategory`, {state : { isLogged : isLogged }})
        }
        else {
            alert("Members Only");
            navigate(`/login`);
        }
    };


    return (
        <MainWrapper>
            <MainTitle>Here are All Categories now we are talking about</MainTitle>
            <AllCategoriesWrapper>
                <CreateCategoryBox onClick={goCreateCate}>
                    <FontAwesomeIcon icon={faPlus} className="plusIcon"/>
                </CreateCategoryBox>
                {cateList?.map((cate:ICateType) => (
                    <CateBox key={cate.id} onClick={() => goTheCate(cate.id)}>
                        <CategoryBoxImg bgphoto={makeImage(cate.category_imgPath, "w500")}/>
                        <CategoryInfo>
                            {cate.category_title} ({cate.category_releaseDate?.slice(0,4)})
                        </CategoryInfo>
                    </CateBox>
                ))}
            </AllCategoriesWrapper>
        </MainWrapper>
    )
}

export default Main




// {/* 영화 큐카드 component 생성 후 영화 갯수만큼 불러오기 */}
// {data && data.getAllUsers.map(() => (
//     <ListOfUsers/>
// ))}
