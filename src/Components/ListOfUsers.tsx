import React from 'react';
import {GET_ALL_USER} from '../Graphql/Queries';
import {DELETE_USER} from '../Graphql/Mutation';
// for loading the data
import {useMutation, useQuery} from '@apollo/client';

function ListOfUsers(){

    const { data } = useQuery(GET_ALL_USER);

    const [deleteUser, { error }] = useMutation(DELETE_USER);

    return(
        <div>
            <h1>THIS IS CREATE LIST OF USERS</h1>
            {data && data.getAllUsers.map((user : any) => {
                return (
                    <div>
                        {user.name} / {user.username}
                        <button onClick={() => {deleteUser({variables : {id:user.id}})}}>Delete it</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ListOfUsers;