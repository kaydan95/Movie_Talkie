import React, {useState} from 'react';
import {CREATE_USER} from "../Graphql/Mutation";
import {useMutation} from "@apollo/client";


function CreateUser(){
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, {error}] = useMutation(CREATE_USER);
    return (
        <div className="App">
            <h1>THIS IS CREATE USER PAGE</h1>
        <input type="text" placeholder="name" onChange={(event) => {
            setName(event.target.value);
        }}/>
        <input type="text" placeholder="username" onChange={(event) => {
            setUserName(event.target.value);
        }}/>
        <input type="password" placeholder="password" onChange={(event) => {
            setPassword(event.target.value);
        }}/>
        <button onClick={() => {createUser({variables : {name : name, username : username, password : password}})}}>Create User</button>
    </div>
    )

}

export default CreateUser;