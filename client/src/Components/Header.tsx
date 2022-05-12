import { HeaderWrapper, LogoSection, MenuModal, MenuSection, SearchSection } from '../Styles/HeaderStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../Graphql/Queries';
import { ILocation } from '../Routes/Main';
import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '../Graphql/Mutation';

// variants
const NavVars = {
    normal : {
        backgroundColor : "rgba(219,226,239,0)"
    },
    scroll : {
        backgroundColor : "rgba(219,226,239,1)",
        transition : {
            delay : 0,
            duration : 0.2
        }
    }
}

export const ModalVars = {
    start : {
        height : 0
    },
    activate : {
        height : 'fit-content',
        transition : {
            duration : 0.1,
        }
    },
    end : {
        height : 0,
        transition : {
            duration : 0.1,
        }
    }
}

// interface
interface IForm {
    keyword : string;
}

function Header() {

    const navAnimation = useAnimation();
    const openAni = useAnimation();
    const { scrollY } = useViewportScroll();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    // 로그인 되어 있는지 유저정보 확인
    const { data : userData, refetch } = useQuery(GET_USER);

    useEffect(() => {
        refetch();
        if(userData?.getUser != null) {
            setIsLogged(true)
        }
        if(userData?.getUser == null) {
            setIsLogged(false)
        }
    })

    const {register, handleSubmit, setValue} = useForm<IForm>();

    const onValid = (data:IForm) => {
        navigate(`/moviesearch?keyword=${data.keyword}`);
        setValue("keyword", "");
    };

    const goMain = () => {
        navigate(`/`, {replace : true, state : { isLogged : isLogged}});
    };

    const OpenClick = () => {
        setIsOpen((prev) => !prev);
        if(isOpen === true) {
            openAni.start("activate");
        }
        if(isOpen === false) {
            openAni.start("start");
        }
    };

    const [goLogout] = useMutation(LOGOUT, {
        onCompleted : () => {
            navigate(`/`, {state : { isLogged : isLogged}});
        }
    })

    const goLogin = () => {
        navigate(`/login`);
        openAni.start("end");
    }

    const goJoin = () => {
        navigate(`/join`);
        openAni.start("end");
    }

    useEffect(() => {
        scrollY.onChange(() => {
            if(scrollY.get() > 30) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("normal")
            }
        });
    }, [scrollY, navAnimation]);
    
    return (
        <>
            <HeaderWrapper variants={NavVars} initial="normal" animate={navAnimation}>
                <LogoSection onClick={goMain}>Movie-Talkie</LogoSection>
                <SearchSection onSubmit={handleSubmit(onValid)}>
                    <FontAwesomeIcon icon={faSearch} className="searchIcon"/>
                    <input
                        {...register("keyword", {required : true, minLength : 2})}
                        placeholder='search movie category'
                        data-testid="input"
                    />
                </SearchSection>
                <MenuSection>
                    <FontAwesomeIcon onClick={OpenClick} icon={faBars} className="barsIcon"/>
                    <MenuModal variants={ModalVars} initial="start" animate={openAni}>
                        {isLogged ? (
                            <>
                                <span>MY PAGE</span>
                                <span onClick={() => goLogout()}>LOGOUT</span>
                            </>
                        ) : (   
                            <>
                                <span onClick={goLogin}>LOGIN</span>
                                <span onClick={goJoin}>JOIN</span>
                            </>
                        )}
                    </MenuModal>
                </MenuSection>
            </HeaderWrapper>
        </>

    )
}

export default React.memo(Header);


