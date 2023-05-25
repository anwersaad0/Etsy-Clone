import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editReviewThunk } from "../../store/reviews";


function ReviewEditModal({revId, rev}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const {closeModal} = useModal();

    console.log(revId);

    const [revText, setRevText] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRevText(rev.review);
        setRating(rev.rating);
    }, [rev])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('review', revText);
        formData.append('rating', rating);

        const editedRev = await dispatch(editReviewThunk(formData, revId));

        setRevText('');
        setRating(0);

        closeModal();
        history.push(`/items/${editedRev.itemId}`);
    }

    return (
        <div>
            <h1>Edit this Review</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="new-rev-form-details">
                <div>
                    <textarea 
                        className="review-textarea"
                        name="review-text"
                        rows="8"
                        cols="40"
                        placeholder="Write your review here..."

                        value={revText}
                        onChange={e => setRevText(e.target.value)}
                        required = {true}
                    ></textarea>
                </div>

                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        onChange={e => setRating(e.target.value)}
                        value={rating}
                        required = {true}
                    ></input>
                </div>

                <div>
                    <button disabled={(revText.length < 10 || !rating || rating < 1 || rating > 5) ? true : false} type="submit">Resubmit Review</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewEditModal;