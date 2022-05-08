import  styled  from 'styled-components';

export const MainWrapper = styled.div`
    width : 100%;
    height : fit-content;
    padding : 40px;
    display: flex;
    flex-direction: column;
`

export const MainTitle = styled.h1`
    font-size : 1.5rem;
    color : ${props => props.theme.base.main};
    font-weight : bold;
    margin: 0px 0px 10px 20px;
`

export const AllCategoriesWrapper = styled.div`
    /* border : 1px solid blue; */
    width : 100%;
    height : 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding : 15px;
`

export const CreateCategoryBox = styled.div`
    border-radius: 15px;
    width : 315px;
    height: 230px;
    margin : 0px 20px 20px 0px;
    display: flex;
    overflow : hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color : ${props => props.theme.base.main};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    .plusIcon {
        font-size: 2rem;
    }
    &:hover {
        cursor: pointer;
        transition : 0.3s;
        color : ${props => props.theme.base.subOne};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`

export const CateBox = styled(CreateCategoryBox)`
    justify-content: flex-start;
`

export const CategoryBoxImg = styled.div<{bgphoto : string}>`
    width: 100%;
    height : 160px;
    background-image: url(${props => props.bgphoto});
    background-position: 50% 40%;
    background-repeat: no-repeat;

`

export const CategoryInfo = styled.div`
    width : 100%;
    height : calc(230px - 160px);
    padding : 20px;
    display: flex;
    align-items: center;
    font-size : 1.1rem;
    font-weight: bold;
`

