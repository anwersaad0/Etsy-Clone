import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        
    }
    

    return (
        <div>

        </div>
    )
}

export default EditItemFormPage;