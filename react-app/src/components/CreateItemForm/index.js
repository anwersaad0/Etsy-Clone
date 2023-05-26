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

    const [itemImage, setItemImage] = useState('');

    const [valErrs, setValErrs] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (valErrs.length) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        const formData2 = new FormData();
        formData2.append('url', itemImage);

        const newItem = await dispatch(createItemThunk(formData, formData2));

        setName('');
        setItemImage('');
        setPrice(0);
        setDesc('');

        setValErrs([]);
        setHasSubmitted(false);

        history.push(`/items/${newItem.id}`);
    }

    useEffect(() => {
        const valErrs = [];

        if (!name.length) {
            valErrs.push("Please enter the item name");
        } else if (name.length > 50) {
            valErrs.push("Name cannot exceed the 50 character limit");
        }

        if (!itemImage) {
            valErrs.push("Please upload an image of the card");
        }

        if (!price || price <= 0) valErrs.push("Please enter a valid item price");

        if (!description.length) {
            valErrs.push("Please enter a description");
        } else if (description.length < 30) {
            valErrs.push("Description must be 30 characters or longer");
        } else if (description.length > 800) {
            valErrs.push("Description cannot exceed the 800 character limit");
        }

        setValErrs(valErrs);
    }, [name, price, description]);

    return (
        <div>
            <h1>Create an Item Listing</h1>
            {hasSubmitted && valErrs.length > 0 && (
                <div>
                    <ul>
                        {valErrs?.map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={(e) => handleSubmit(e)} className='new-item-form-details'>
                <div>
                    <div><label>Card Name</label></div>
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
                    <div><label>Card Image:</label></div>
                    <input
                        type='file'
                        name='image'
                        accept='image/*'
                        onChange={(e) => setItemImage(e.target.files[0])}
                        required={true}
                    ></input>
                </div>

                <div>
                    <div><label>Card Price</label></div>
                    <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required={true}
                    >
                    </input>
                </div>

                <div>
                    <div><label>Description</label></div>
                    <textarea
                        type="text"
                        name="desc"
                        rows="8"
                        cols="40"

                        onChange={e => setDesc(e.target.value)}
                        value={description}
                        required={true}
                    >
                    </textarea>
                </div>

                <div>
                    <button type="submit">Create Listing</button>
                </div>
            </form>
        </div>
    )
}

export default ItemFormPage;