import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneItemThunk } from "../../store/items";
import { getOneUserThunk } from "../../store/users";
import ItemReviews from "../ItemReviews";


function ItemPage() {
    const dispatch = useDispatch();

    const {itemId} = useParams();

    const item = useSelector((state) => state.items[itemId]);
    const user = useSelector((state) => state.users[item?.userId]);

    useEffect(() => {
        dispatch(getOneItemThunk(itemId));
        dispatch(getOneUserThunk(item?.userId));
    }, [itemId, item?.userId, dispatch]);

    if (!item) return null;

    //console.log('item ', item);
    //console.log(typeof item?.userId);

    return (
        <div>
            <div>
                <p>{item.name}</p>
                <p>By {user?.username}</p>
            </div>

            <div>
                <p>Price: ${item.price.toFixed(2)}</p>
            </div>

            <div>
                <p>{item.description}</p>
            </div>

            <div>
                {(item.rating) ? (<p>Rating: {item.rating.toFixed(1)}</p>) : (<p>Unrated</p>)}
            </div>

            <div>
                <h2>Reviews</h2>
                <div>
                    <ItemReviews />
                </div>
            </div>
        </div>
    )
}

export default ItemPage;