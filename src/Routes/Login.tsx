import { useMutation } from '@apollo/client';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Graphql/Mutation';
import { FormBox } from '../Styles/CreateCateStyle'
import { JoinBox, JoinForm, JoinFormBoxWrapper, JoinTitle, JoinWrapper, JoinBtn } from './Join'

function Login() {

    const [userId, setUserId] = useState("");
    const [userPw, setuserPw] = useState("");
    const navigate = useNavigate();

    const [Login, {error, data : loginData} ] = useMutation(LOGIN, {
        variables : {
            name : userId,
            password : userPw
        },
        onCompleted : (data) => {
            if(!error){
                alert(`${data?.login?.user?.username}` +  "님 환영합니다");
                navigate(`/`);
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

export default Login