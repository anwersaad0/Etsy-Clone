import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createItemThunk } from '../../store/items';


function ItemFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        if (!sessionUser) {
            history.push('/');
        }
    }, [sessionUser, history]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDesc] = useState('');

    const [valErrs, setValErrs] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (valErrs.length) return alert("Your listing has errors, cannot submit!");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        const newItem = await dispatch(createItemThunk(formData));

        setName('');
        setPrice(0);
        setDesc('');
        setValErrs([]);

        history.push(`/items/${newItem.id}`);
    }

    useEffect(() => {
        const valErrs = [];

        if (!name) valErrs.push("Please enter the item name");
        if (!price) valErrs.push("Please enter the item price");
        if (!description) valErrs.push("Please enter a description");

        setValErrs(valErrs);
    }, [name, price, description]);

    return (
        <div>
            <h1>Create an Item Listing</h1>
            {valErrs.length > 0 && (
                <div>
                    <ul>
                        {valErrs.map(err => {
                            <li key={err}>{err}</li>
                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={(e) => handleSubmit(e)} className='new-item-form-details'>
                <div>
                    <div><label>Item Name</label></div>
                    <input 
                        type="text"
                        name="name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required={true}
                    >
                    </input>
                </div>

                <div>
                    <div><label>Item Price</label></div>
                    <input
                        type="number"
                        name="price"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required={true}
                    >
                    </input>
                </div>

                <div>
                    <div><label>Description</label></div>
                    <input
                        type="text"
                        name="desc"
                        onChange={e => setDesc(e.target.value)}
                        value={description}
                        required={true}
                    >
                    </input>
                </div>

                <div>
                    <button type="submit">Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default ItemFormPage;