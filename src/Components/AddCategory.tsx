import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../Graphql/Mutation';


function AddCategory() {

    const [category_title, setCateTitle] = useState("");
    const [category_img, setCateImgFile] = useState<File>();


    const fileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files){
            return;
        }
        
        console.log(event.target.files[0]);

        setCateImgFile(event.target.files[0]);
    }

    const [addCategory, {error}] = useMutation(ADD_CATEGORY);

    return (
        <div>
            <h3>Add Category</h3>
            <div>
                <input type="text" placeholder="category name" onChange={(event) => {
                    setCateTitle(event.target.value);
                }} />
                <input type="file" name="file" id="file" onChange={fileUpload}/>
                <button onClick={() => {
                    addCategory({variables : {category_title:category_title, category_img:category_img}});
                }}>Add Category</button>
            </div>
        </div>
    )
}

export default AddCategory
