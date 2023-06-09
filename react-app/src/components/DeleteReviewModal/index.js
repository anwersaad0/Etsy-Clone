import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { getOneItemThunk } from "../../store/items";
import './DeleteReviewModal.css';

function ReviewDeleteModal({revId, itemId}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        const deletedRev = await dispatch(deleteReviewThunk(revId));
        if (deletedRev.message === "Delete Successful") {
            await dispatch(getOneItemThunk(itemId));
            closeModal();
            history.push(`/items/${itemId}`);
        }
    }

    return (
        <div className="delete-rev-div">
            <h1>Delete your Review?</h1>
            <form onSubmit={handleDelete}>
                <button className="decline-rev-delete" onClick={closeModal}>No, keep my review</button>
                <button className="confirm-rev-delete" type="submit">Yes, delete my review</button>
            </form>
        </div>
    )
}

export default ReviewDeleteModal;