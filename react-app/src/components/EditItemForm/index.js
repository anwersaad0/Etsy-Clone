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

        if (!name) valErrs.push("Please enter the item name");
        if (!price) valErrs.push("Please enter the item price");
        if (!description) valErrs.push("Please enter a description");

        setValErrs(valErrs);
    }, [name, price, description]);

    if (!item) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (valErrs.length) return alert("Your edit has errors, cannot submit!");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        const editedItem = await dispatch(editItemThunk(formData, itemId));
        setName('');
        setPrice('');
        setDesc('');
        setValErrs([]);

        history.push(`/items/${editedItem.id}`);
    }
    

    return (
        <div>
            <h1>Edit this Item Listing</h1>
            {valErrs.length > 0 && (
                <div>
                    <ul>
                        {valErrs.map(err => {
                            <li key={err}>{err}</li>
                        })}
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
                    <button type="submit">Confirm Edits</button>
                </div>
            </form>
        </div>
    )
}

export default EditItemFormPage;