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
    const { data : userData , refetch : userRefetch} = useQuery(GET_USER);
    const userName = userData?.getUser?.name;

    const [isLogged, setIsLogged] = useState(false);
    const [ createToken, {data : accessTokenData} ] = useMutation(CREATE_NEW_ACCESSTOKEN, {
        onCompleted : () => {
            setIsLogged(true)
        }
    });


    const [cateList, setCateList] = useState([]);
    const { data : AllCates, refetch : cateRefetch} = useQuery(GET_ALL_CATEGORIES, {
        onCompleted : (data) => {
            setCateList(data?.getAllCategories);
        }
    });

    // console.log(AllCates?.getAllCategories)

    useEffect(() => {
        cateRefetch();

        if(userName !== "") {
            createToken({
                variables : {
                    name : userName
                }
            });
        }

        if(userData?.getUser == null) {
            setIsLogged(false);
        }

        // if(userData?.geUser == null && accessTokenData?.createNewAccessToken == undefined) {
        //     setIsLogged(false);
        // }

        userRefetch();

    }, [userName, userData?.geUser]);

    // console.log(userData);

    // console.log(accessTokenData);

    // console.log(isLogged);

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
