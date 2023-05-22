import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import { getOneItemThunk } from "../../store/items";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";


function ItemReviews() {
    const dispatch = useDispatch();

    const {itemId} = useParams();


    useEffect(() => {
        dispatch(getOneItemThunk(itemId));
        dispatch(getReviewsThunk(itemId));
    }, [dispatch, itemId]);

    const sessionUser = useSelector(state => state.session.user);
    const item = useSelector(state => state.items[itemId]);

    const revs = useSelector(state => Object.values(state.reviews));
    const reverseRevs = revs.toReversed();

    let owned = 0;
    let alreadyReviewed = 0;

    if (sessionUser) {
        revs.forEach(rev => {
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
                buttonText="Post Your Review"
                modalComponent={<CreateReviewModal itemId={itemId}/>}
            />
        )
    }

    //console.log('revs', revs);

    return (
        <div>
            {addRevBtn}

            {revs && reverseRevs?.map(rev => (
                <div>
                    <p>By {rev?.userId}</p>
                    <p>{rev?.review}</p>
                </div>
            ))}
        </div>
    )
}

export default ItemReviews;