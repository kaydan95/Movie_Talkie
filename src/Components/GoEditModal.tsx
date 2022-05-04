import { BeforeGoEditModal, CancelIconBox } from '../Styles/ArticleStyle';
import { JoinBox, JoinBtn, JoinFormBoxWrapper, JoinTitle } from '../Routes/Join';
import { FormBox } from '../Styles/CreateCateStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAnimation } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMatch, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_ARTICLE } from '../Graphql/Mutation';


// variants
export const EditModalVars = {
    start : {
        opacity : 1,
        zIndex : 2,
        height : '100%',
        transition : {
            duration : 0.1,
        }
    },
    end : {
        height : 0,
        opacity : 0,
        zIndex : 0,
        transition : {
            duration : 0.1,
        }
    }
}


export interface IVerify {
    username : string;
    password : string;
}


function GoEditModal(article : any) {

    const openModalAni = useAnimation();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, formState: { errors }} = useForm<IVerify>();

    const onEditVerifyValid = (data:IVerify) => {
        if(data.username === article.article?.username && data.password === article.article?.password){
            navigate(`/category/${article.categoryId}/editArticle/${article.id}`);
            setValue("username", "");
            setValue("password", "");
        }
        if(data.username !== article.article?.username || data.password !== article.article?.password){
            alert("Wrong Username Or Password");
            setValue("username", "");
            setValue("password", "");
        }
    };

    const [deleteArticle] = useMutation(DELETE_ARTICLE, {
        onCompleted : () => {
            navigate(`/category/${article.categoryId}`);
        }
    });

    const onDeleteVerifyValid = (data:IVerify) => {
        if(data.username === article.article?.username && data.password === article.article?.password){
            deleteArticle({
                variables : {
                    id : article.id,
                    username : data.username,
                    password : data.password
                }
            });
            alert("delete successfully");
            setValue("username", "");
            setValue("password", "");
        }
        if(data.username !== article.article?.username || data.password !== article.article?.password){
            alert("Wrong Username Or Password");
            setValue("username", "");
            setValue("password", "");
        }
    };

    const closeModal = () => {
        openModalAni.start("end");
    }

    return (
        <BeforeGoEditModal variants={EditModalVars} initial="start" animate={openModalAni}>
            <CancelIconBox>
                <FontAwesomeIcon onClick={closeModal} icon={faXmark} className="closeIcon"/>
            </CancelIconBox>
            <JoinBox 
                style={{margin : '50px auto', backgroundColor : 'white'}}
            >
                <JoinTitle>VERIFICATION CARD</JoinTitle>
                    <JoinFormBoxWrapper>
                        <p>username</p>
                        <FormBox>
                            <input 
                                {...register("username", {required : true, minLength : 4})}
                                placeholder='username'
                            />
                        </FormBox>
                        <span className='errorMessage'>
                            {errors.username?.type === 'required' && "This field is required"}
                        </span>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>article password</p>
                        <FormBox>
                            <input
                                {...register("password", {required : true, minLength : 4})}
                                placeholder='article password'/>
                        </FormBox>
                        <span className='errorMessage'>
                            {errors.password?.type === 'required' && "This field is required"}
                        </span>
                    </JoinFormBoxWrapper>
                    {article.modalType ? (
                        <JoinBtn style={{width : '100%'}} onClick={handleSubmit(onEditVerifyValid)}>VERIFY FOR EDIT</JoinBtn>
                    ) : (
                        <JoinBtn style={{width : '100%'}} onClick={handleSubmit(onDeleteVerifyValid)}>VERIFY FOR DELETE</JoinBtn>
                    )}
                    
            </JoinBox>
        </BeforeGoEditModal>
    )
}

export default GoEditModal