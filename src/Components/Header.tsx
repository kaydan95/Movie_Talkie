import { HeaderWrapper, LogoSection, MenuModal, MenuSection, SearchSection } from '../Styles/HeaderStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

const ModalVars = {
    start : {
        opacity : 0
    },
    activate : {
        opacity : 1,
        transition : {
            duration : 0.1,
        }
    },
    end : {
        opacity : 0,
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

    const {register, handleSubmit, setValue} = useForm<IForm>();

    const onValid = (data:IForm) => {
        navigate(`/moviesearch?keyword=${data.keyword}`);
        setValue("keyword", "");
    };

    const goMain = () => {
        navigate(`/`);
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
        })
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
                    />
                </SearchSection>
                <MenuSection>
                    <FontAwesomeIcon onClick={OpenClick} icon={faBars} className="barsIcon"/>
                    <MenuModal variants={ModalVars} initial="start" animate={openAni}>
                        <span onClick={goLogin}>LOGIN</span>
                        <span onClick={goJoin}>JOIN</span>
                    </MenuModal>
                </MenuSection>
            </HeaderWrapper>
        </>

    )
}

export default Header


