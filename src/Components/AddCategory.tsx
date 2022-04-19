import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../Graphql/Mutation';


function AddCategory() {

    const [category_title, setCateTitle] = useState("");
    const [category_id, setCateId] = useState(0);

    const [addCategory, {error}] = useMutation(ADD_CATEGORY);

    return (
        <div>
            <h3>Add Category</h3>
            <div>
                <input type="number" placeholder='category id' onChange={(event) => {
                    setCateId(+event.target.value);
                }} />
                <input type="text" placeholder="category name" onChange={(event) => {
                    setCateTitle(event.target.value);
                }} />
                <button onClick={() => {
                    addCategory({variables : {id:category_id, category_title:category_title}});
                }}>Add Category</button>
            </div>
        </div>
    )
}

export default AddCategory
