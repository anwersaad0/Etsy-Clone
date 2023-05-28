import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import { getOneItemThunk } from "../../store/items";
import { getReviewsThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './CreateReviewModal.css';

function CreateReviewModal({itemId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    //const {itemId} = useParams();

    const {closeModal} = useModal();

    //const item = useSelector(state => state.items[itemId]);

    const [revText, setRevText] = useState('');
    const [rating, setRating] = useState(0);
    const [activeRating, setActiveRating] = useState(rating);

    const [valErrs, setValErrs] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (valErrs.length) return;

        const formData = new FormData();
        formData.append('review', revText);
        formData.append('rating', rating);

        const newRev = await dispatch(createReviewThunk(itemId, formData));
        console.log(newRev);

        setRevText('');
        setRating(0);

        setValErrs([]);
        setHasSubmitted(false);

        await dispatch(getOneItemThunk(itemId));
        closeModal();
        //history.push(`/items/${newRev.itemId}`);
    }

    useEffect(() => {
        const valErrs = [];

        if (!revText.length) {
            valErrs.push("Please write a review of the item");
        } else if (revText.length > 400) {
            valErrs.push("Review exceeds the character limit (400)");
        } else if (revText.length < 10) {
            valErrs.push("Review must be at least 10 characters");
        }

        setValErrs(valErrs);
    }, [revText]);

    return (
        <div className="create-rev-div">
            <h1>Rate this Item</h1>
            {hasSubmitted && valErrs.length > 0 && (
                <div>
                    <ul className="create-rev-errors">
                        {valErrs?.map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={(e) => handleSubmit(e)} className="new-rev-form-details">
                <div>
                    <textarea 
                        className="review-textarea"
                        name="review-text"
                        rows="8"
                        cols="40"
                        placeholder="Write your review here... (minimum 10 characters)"

                        value={revText}
                        onChange={e => setRevText(e.target.value)}
                        required = {true}
                    ></textarea>
                </div>

                <div className="star-input">
                    <div onClick={() => setRating(1)} onMouseEnter={() => setActiveRating(1)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 1) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(2)} onMouseEnter={() => setActiveRating(2)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 2) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(3)} onMouseEnter={() => setActiveRating(3)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 3) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(4)} onMouseEnter={() => setActiveRating(4)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 4) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(5)} onMouseEnter={() => setActiveRating(5)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 5) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                </div>

                <div>
                    <button className="confirm-create-rev" disabled={(!rating) ? true: false} type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReviewModal;