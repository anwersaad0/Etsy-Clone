import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import { getOneItemThunk } from "../../store/items";
import { useModal } from "../../context/Modal";

function CreateReviewModal({itemId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    //const {itemId} = useParams();

    const {closeModal} = useModal();

    //const item = useSelector(state => state.items[itemId]);

    const [revText, setRevText] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('review', revText);
        formData.append('rating', rating);

        const newRev = await dispatch(createReviewThunk(itemId, formData));
        console.log(newRev);

        setRevText('');
        setRating(0);

        closeModal();
        history.push(`/items/${newRev.itemId}`);
    }

    return (
        <div>
            <h1>Rate this Item</h1>
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
                    <button disabled={(revText.length < 10 || !rating || rating < 1 || rating > 5) ? true : false} type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewModal;