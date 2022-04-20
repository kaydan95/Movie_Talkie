import { motion } from 'framer-motion';
import  styled  from 'styled-components';

export const HeaderWrapper = styled(motion.div)`
    padding : 20px;
    width : 100%;
    height : 80px;
    display : grid;
    position: sticky;
    top : 0;
    z-index: 1;
    grid-template-columns: 20% 68% 10%;
`

export const LogoSection = styled.div`
    display : flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color : ${props => props.theme.base.main};
    font-size: 1.5rem;
    font-family: 'Federo', sans-serif;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

export const SearchSection = styled.form`
    border : 1px solid ${props => props.theme.base.subOne};
    border-radius: 50px;
    width : 100%;
    color : ${props => props.theme.base.main};
    font-size: 1rem;
    padding : 10px 15px;
    display: inline-flex;
    align-items: center;
    .searchIcon {
        color : ${props => props.theme.base.main};
        font-size : 1rem;
    }
    input {
        background-color: transparent;
        color : ${props => props.theme.base.main};
        border : none;
        margin-left: 10px;
        &:focus {
            outline: none;
        }
    }
`

export const MenuSection = styled.div`
    display: flex;
    justify-content: center;
    /* justify-content: flex-end; */
    align-items: center;
    background-color: transparent;
    .barsIcon {
        background-color: transparent;
        font-size: 1.3rem;
        color : ${props => props.theme.base.main};
        &:hover {
            color : ${props => props.theme.base.subOne};
            cursor: pointer;
            transition: 0.3s;
        }
    }
`


