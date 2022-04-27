import React from 'react'
import styled from 'styled-components';
import { CreateCateBtn, FormBox, FormBoxWrapper } from '../Styles/CreateCateStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const JoinWrapper = styled.div`
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

export const JoinBox = styled.div`
    padding : 20px;
    width : 35%;
    height : fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.19);
`

export const JoinForm = styled.form`
    display: flex;
    flex-direction: column;
    width : 100%;
`

export const JoinFormBoxWrapper = styled(FormBoxWrapper)`
    margin-bottom: 10px;
    p {
        text-transform: uppercase;
        font-size: 0.9rem;
        color: ${props => props.theme.base.main};
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

function Join() {
    return (
        <JoinWrapper>
            <JoinBox>
                <JoinTitle>JOIN CARD</JoinTitle>
                <JoinForm>
                    <JoinFormBoxWrapper>
                        <p>user id</p>
                        <FormBox>
                            <input placeholder='user ID'/>
                        </FormBox>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>user name</p>
                        <FormBox>
                            <input placeholder='user Name'/>
                        </FormBox>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>password</p>
                        <FormBox>
                            <input placeholder='password'/>
                        </FormBox>
                    </JoinFormBoxWrapper>
                    <JoinFormBoxWrapper>
                        <p>confirm password</p>
                        <FormBox>
                            <input placeholder='confirm password'/>
                        </FormBox>
                    </JoinFormBoxWrapper>
                </JoinForm>
            </JoinBox>
            <JoinBtn>JOIN</JoinBtn>
        </JoinWrapper>
    )
}

export default Join