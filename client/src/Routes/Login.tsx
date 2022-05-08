import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Graphql/Mutation';
import { FormBox } from '../Styles/CreateCateStyle'
import { JoinForm, JoinFormBoxWrapper, JoinTitle, JoinBtn } from './Join'

const LoginWrapper = styled.div`
    padding : 10px;
    width : 100%;
    height : 88vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const LoginBox = styled.div`
    padding : 20px;
    width : 35%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
`

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
                alert("로그인 성공")
                navigate(`/`);
            }
        }
    });

    return (
        <LoginWrapper>
            <LoginBox>
                <JoinTitle>LOGIN CARD</JoinTitle>
                <JoinForm>
                    <JoinFormBoxWrapper>
                        <p>user id</p>
                        <FormBox>
                            <input 
                                placeholder='user ID' 
                                onChange={(event) => {setUserId(event.target.value)}}
                            />
                        </FormBox>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>password</p>
                        <FormBox>
                            <input 
                                placeholder='password'
                                type='password'
                                onChange={(event) => {setuserPw(event.target.value)}}
                            />
                        </FormBox>
                    </JoinFormBoxWrapper>
                </JoinForm>
            </LoginBox>
            <JoinBtn onClick={() => Login()}>LOGIN</JoinBtn>
        </LoginWrapper>
    )
}

export default Login;