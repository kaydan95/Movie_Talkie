import { useMutation } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN } from '../Graphql/Mutation';
import { FormBox } from '../Styles/CreateCateStyle'
import { JoinBox, JoinForm, JoinFormBoxWrapper, JoinTitle, JoinWrapper, JoinBtn } from './Join'

function Login() {

    const [userId, setUserId] = useState("");
    const [userPw, setuserPw] = useState("");
    const navigate = useNavigate();

    const [Login, {error, data} ] = useMutation(LOGIN, {
        variables : {
            name : userId,
            password : userPw
        },
        onError : () => {
            alert("로그인 오류")
        },
        onCompleted : (data) => {
            if(data?.login.accessToken != ""){
                const isLogged = true;
                alert("로그인 성공")
                navigate(`/`, {state : { isLogged : isLogged }})
            }
        }
    });

    return (
        <JoinWrapper>
            <JoinBox>
                <JoinTitle>LOGIN CARD</JoinTitle>
                <JoinForm>
                    <JoinFormBoxWrapper>
                        <p>user id</p>
                        <FormBox>
                            <input 
                                placeholder='user ID'
                                value={userId} 
                                onChange={(event) => {setUserId(event.target.value);}}
                            />
                        </FormBox>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>password</p>
                        <FormBox>
                            <input 
                                placeholder='password'
                                type='password'
                                value={userPw} 
                                onChange={(event) => {setuserPw(event.target.value);}}
                            />
                        </FormBox>
                    </JoinFormBoxWrapper>
                </JoinForm>
            </JoinBox>
            <JoinBtn onClick={() => Login()}>LOGIN</JoinBtn>
        </JoinWrapper>
    )
}

export default Login;