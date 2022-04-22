import {GET_ALL_CATEGORIES} from '../Graphql/Queries';
import {useNavigate} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import { AllCategoriesWrapper, CateBox, CategoryBoxImg, CategoryInfo, CreateCategoryBox, MainTitle, MainWrapper } from '../Styles/MainStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { makeImage } from '../util';
import { useEffect, useState } from 'react';

interface ICateType {
    id : number;
    category_title : string;
    category_imgPath : string;
    category_releaseDate : string;
}

function Main() {
    const navigate = useNavigate();
    
    const goCreateCate = () => {
        navigate(`/createCategory`)
    }

    const { data : AllCates } = useQuery(GET_ALL_CATEGORIES);

    const cateList = AllCates?.getAllCategories;

    return (
        <MainWrapper>
            <MainTitle>Here are All Categories now we are talking about</MainTitle>
            <AllCategoriesWrapper>
                <CreateCategoryBox onClick={goCreateCate}>
                    <FontAwesomeIcon icon={faPlus} className="plusIcon"/>
                </CreateCategoryBox>
                {cateList?.map((cate:ICateType) => (
                    <CateBox key={cate.id}>
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
