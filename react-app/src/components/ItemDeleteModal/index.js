import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteItemThunk } from "../../store/items";


function ItemDeleteModal({itemId}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        const deletedItem = await dispatch(deleteItemThunk(itemId));
        if (deletedItem.message === "Delete Successful") {
            history.push("/items/current");
            closeModal();
        }
    }

    return (
        <div>
            <h1>Delete this Item?</h1>
            <form onSubmit={handleDelete}>
                <button onClick={closeModal}>No, keep this item</button>
                <button type="submit">Yes, delete this item</button>
            </form>
        </div>
    )
}

export default ItemDeleteModal;