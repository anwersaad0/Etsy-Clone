import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItemThunk } from "../../store/items";
import { getOneItemThunk } from "../../store/items";


function EditItemFormPage() {
    const {itemId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const item = useSelector(state => state.items[itemId]);

    useEffect(() => {
        if (item) {
            if (!sessionUser || sessionUser.id !== item.userId) {
                history.push('/');
            }
        }
    }, [item, sessionUser, history]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDesc] = useState('');

    const [valErrs, setValErrs] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getOneItemThunk(itemId));
    }, [dispatch]);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price);
            setDesc(item.description);
        }
    }, [item])

    useEffect(() => {
        const valErrs = [];

        if (!name.length) {
            valErrs.push("Please enter the item name");
        } else if (name.length > 50) {
            valErrs.push("Name cannot exceed the 50 character limit");
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

    if (!item) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (valErrs.length) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        const editedItem = await dispatch(editItemThunk(formData, itemId));
        setName('');
        setPrice('');
        setDesc('');

        setValErrs([]);
        setHasSubmitted(false);

        history.push(`/items/${editedItem.id}`);
    }
    

    return (
        <div>
            <h1>Edit this Item Listing</h1>
            {hasSubmitted && valErrs.length > 0 && (
                <div>
                    <ul>
                        {valErrs.map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form method="PUT" onSubmit={(e) => handleSubmit(e)} className='edit-item-form-details'>
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
                    <button type="submit">Confirm Edits</button>
                </div>
            </form>
        </div>
    )
}

export default EditItemFormPage;