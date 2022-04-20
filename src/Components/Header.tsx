import { HeaderWrapper, LogoSection, MenuSection, SearchSection } from '../Styles/HeaderStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect } from 'react';
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

// interface
interface IForm {
    keyword : string;
}

function Header() {

    const navAnimation = useAnimation();
    const { scrollY } = useViewportScroll();
    const navigate = useNavigate();

    const {register, handleSubmit, setValue} = useForm<IForm>();

    const onValid = (data:IForm) => {
        navigate(`/moviesearch?keyword=${data.keyword}`);
        setValue("keyword", "");
    }

    const goMain = () => {
        navigate(`/`);
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
                <FontAwesomeIcon icon={faBars} className="barsIcon"/>
            </MenuSection>
        </HeaderWrapper>
    )
}

export default Header


