import React, { useState } from 'react'
import styled from 'styled-components';
import { CreateCateBtn, FormBox, FormBoxWrapper } from '../Styles/CreateCateStyle';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from '../Graphql/Mutation';
import { useNavigate } from 'react-router-dom';
import { CHECK_USER } from '../Graphql/Queries';

export const JoinWrapper = styled.form`
    padding : 10px;
    width : 100%;
    height : 88vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

export const JoinTitle = styled.h1`
    width : fit-content;
    color : ${props => props.theme.base.main};
    font-weight : bold;
    font-size : 2rem;
    margin-bottom: 20px;
`

export const JoinBox = styled.form`
    padding : 20px;
    width : 35%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
`

export const JoinContainer = styled.div`
    padding : 20px;
    width : 35%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
`

export const JoinForm = styled.div`
    display: flex;
    flex-direction: column;
    width : 100%;
`

export const JoinFormBoxWrapper = styled(FormBoxWrapper)`
    margin-bottom: 10px;
    /* border : 1px solid red; */
    height : 82px;
    margin-top: 5px;
    p {
        text-transform: uppercase;
        font-size: 0.9rem;
        color: ${props => props.theme.base.main};
    }
    .errorMessage {
        color : ${props => props.theme.extra.red};
        margin : 8px 0px 0px 5px;
        font-size : 14px;
    }
`

export const JoinBtn = styled(CreateCateBtn)`
    width : 35%;
    border : none;
    background-color: ${props => props.theme.base.subTwo};
    color : ${props => props.theme.base.main};
    &:hover {
        color : ${props => props.theme.base.background};
        background-color: ${props => props.theme.base.subOne};
    }
`

// interface
interface IJoinVerify {
    userId : string;
    userName : string;
    userPw : string;
    userPwCon : string;
}

function Join() {

    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    const {register, handleSubmit, formState: { errors }, watch} = useForm<IJoinVerify>({
        mode : "onChange"
    });

    const [ join ] = useMutation(CREATE_USER, {
        onCompleted : () => {
            navigate(`/login`);
        }
    });

    const onJoinValid = (data : IJoinVerify) => {
        const randomId = Math.floor(Math.random()*(9999-1000+1)) + 1000;
        setUserId(data.userId);
        setUserName(data.userName);

        if(randomId !== 0 && checkData.checkUser.bothOkay === 1){
            join({
                variables : {
                    id : randomId,
                    name : data.userId,
                    username : data.userName,
                    password : data.userPw
                }
            });
            alert(`${data.userName} 님 환영합니다.`);
        }

        else {
            alert("이미 존재하는 회원입니다.");
        }

    };


    const { data : checkData } = useQuery(CHECK_USER, {
        variables : {
            userId : userId,
            userName : userName
        }
    });

    // console.log(checkData);

    return (
        <JoinWrapper>
            <JoinContainer>
                <JoinTitle>JOIN CARD</JoinTitle>
                <JoinFormBoxWrapper>
                    <p>user id</p>
                    <FormBox>
                        <input
                            {...register("userId", {
                                required : "This field is required",
                                pattern : {
                                    value : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
                                    message : "please keep the form"
                                },
                                validate : (val : string) => {
                                    setUserId(val);
                                    if(checkData.checkUser.userIdTaken || checkData.checkUser.bothTaken === 1 ){
                                        return "userId is taken"
                                    }
                                }
                            })}
                            placeholder='email@email.com'
                        />
                    </FormBox>
                    <span className='errorMessage'>
                        {errors.userId?.message}
                    </span>
                </JoinFormBoxWrapper>
                <JoinFormBoxWrapper>
                    <p>user name</p>
                    <FormBox>
                        <input
                            {...register("userName", {
                                required : "This field is required",
                                minLength : {
                                    value : 5,
                                    message : "UserName should be more than 4 less than 10 characters"
                                },
                                maxLength : {
                                    value : 10,
                                    message : "UserName should be more than 4 less than 10 characters"
                                },
                                validate : (val : string) => {
                                    setUserName(val);
                                    console.log(checkData.checkUser)
                                    if(checkData.checkUser.userNameTaken || checkData.checkUser.bothTaken === 1 ){
                                        return "userName is taken"
                                    }
                                }
                            })}
                            placeholder='user Name'
                        />
                    </FormBox>
                    <span className='errorMessage'>
                        {errors.userName?.message}
                    </span>
                </JoinFormBoxWrapper>
                <JoinFormBoxWrapper>
                    <p>password</p>
                    <FormBox>
                        <input
                            {...register('userPw', {
                                required : "This field is required",
                                pattern : {
                                    value : /^[A-Za-z0-9]{6,12}$/,
                                    message : "The password should be more than 6 less than 12 including letters, numbers"
                                },
                                minLength : {
                                    value : 6,
                                    message : "The password should be more than 6 less than 12 including letters, numbers"
                                },
                                maxLength : {
                                    value : 12,
                                    message : "The password should be more than 6 less than 12 including letters, numbers"
                                }
                            })}
                            placeholder='password'
                        />
                    </FormBox>
                    <span className='errorMessage'>
                        {errors.userPw?.message}
                    </span>
                </JoinFormBoxWrapper>
                <JoinFormBoxWrapper>
                    <p>confirm password</p>
                    <FormBox>
                        <input
                            {...register("userPwCon", {
                                required : "This field is required",
                                validate : (val:string) => {
                                    if(watch('userPw') !== val) {
                                        return "passwords do not match"
                                    }
                                }
                            })}
                            placeholder='confirm password'
                        />
                    </FormBox>
                    <span className='errorMessage'>
                        {errors.userPwCon?.message}
                    </span>
                </JoinFormBoxWrapper>
            </JoinContainer>
            <JoinBtn onClick={handleSubmit(onJoinValid)}>JOIN</JoinBtn>
        </JoinWrapper>
    )
}

export default React.memo(Join);