import React, { useState } from 'react';
import {UPDATE_PASSWORD} from '../Graphql/Mutation';
import {useMutation} from '@apollo/client';

function UpdatePw(){

    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [updatePassword, {error}] = useMutation(UPDATE_PASSWORD);
    
    return(
        <div>
            <h1>THIS IS CREATE UPDATE PW</h1>
            <input type="text" placeholder="Username.."
            onChange = {(event) => {
                setUsername(event.target.value)}}
            />
            <input type="text" placeholder="Current Pw.."
            onChange = {(event) => {
                setCurrentPassword(event.target.value)}}
            />
            <input type="text" placeholder="New PW.."
            onChange = {(event) => {
                setNewPassword(event.target.value)}}
                />

            <button onClick = {() => { updatePassword({variables : {username : username, oldPassword : currentPassword, newPassword : newPassword }})}}>UPDATE_PASSWORD</button>
        </div>
    )
}

export default UpdatePw;