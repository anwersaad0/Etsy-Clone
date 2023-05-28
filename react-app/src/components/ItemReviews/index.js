import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { getOneItemThunk } from "../../store/items";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import ReviewDeleteModal from "../DeleteReviewModal";
import ReviewEditModal from "../EditReviewModal";
import { getAllUsersThunk } from "../../store/users";


function ItemReviews() {
    const dispatch = useDispatch();

    const {itemId} = useParams();


    useEffect(() => {
        dispatch(getOneItemThunk(itemId));
        dispatch(getReviewsThunk(itemId));
        dispatch(getAllUsersThunk());
    }, [dispatch, itemId]);

    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => Object.values(state.users));
    const item = useSelector(state => state.items[itemId]);

    const revs = useSelector(state => Object.values(state.reviews));
    const reverseRevs = revs.filter(rev => rev.itemId === item.id).toReversed();

    let owned = 0;
    let alreadyReviewed = 0;

    if (sessionUser) {
        reverseRevs.forEach(rev => {
            if (rev.userId === sessionUser.id) {
                alreadyReviewed = 1;
            }
        });
    }

    if ((sessionUser) && (item.userId === sessionUser.id)) {
        owned = 1;
    }

    let addRevBtn;
    if (sessionUser && owned === 0 && alreadyReviewed === 0) {
        addRevBtn = (
            <OpenModalButton 
                buttonClass="post-rev-btn"
                buttonText="Post Your Review"
                modalComponent={<CreateReviewModal itemId={itemId}/>}
            />
        )
    }

    //console.log(`owned? ${owned}, already reviewed? ${alreadyReviewed}`);

    return (
        <div>
            <div className="add-rev-btn-div">
                {!owned && !reverseRevs.length && (<p>Be the first to review this listing</p>)}
                {addRevBtn}
            </div>

            {reverseRevs?.map(rev => (
                <div className="review-div" key={rev.id}>
                    <p className="rev-user-text">By {users[rev?.userId - 1]?.username}</p>
                    <p>{rev?.review}</p>
                    <p>Rating: <i className="fas fa-star card-mini-star" /> {rev?.rating}</p>

                    {(sessionUser) && (rev.userId === sessionUser.id) && (
                        <div className="rev-user-ui">
                            <OpenModalButton buttonClass="edit-rev-btn" buttonText="Edit" modalComponent={<ReviewEditModal revId={rev.id} rev={rev} />} />
                            <OpenModalButton buttonClass="del-rev-btn" buttonText="Delete" modalComponent={<ReviewDeleteModal revId={rev.id} itemId={rev.itemId} />} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ItemReviews;