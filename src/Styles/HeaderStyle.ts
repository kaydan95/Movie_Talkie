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
    font-family: 'Abril Fatface', cursive;
    display : flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color : ${props => props.theme.base.main};
    font-size: 1.5rem;
    font-family: 'Federo', sans-serif;
    font-weight: 900;
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
        width: 100%;
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
    position: relative;
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

export const MenuModal = styled(motion.div)`
    width : 80px;
    height : fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    top : 50px;
    right : 25px;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    align-items: center;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
    background-color: ${props => props.theme.base.background};
    span {
        width : 100%;
        height : 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.theme.base.main};
        &:hover {
            transition: 0.2s;
            font-weight: bold;
            cursor: pointer;
            color : ${props => props.theme.base.main};
            background-color: ${props => props.theme.base.subTwo};
        }
        &:first-child {
            border-bottom: 0.6px solid rgba(0, 0, 0, 0.2);
        }
    }
`


