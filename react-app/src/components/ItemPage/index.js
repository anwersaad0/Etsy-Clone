import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneItemThunk } from "../../store/items";
import { getOneUserThunk } from "../../store/users";
import ItemReviews from "../ItemReviews";
import CartComponent from "../CartComponent";
import './ItemPage.css';


function ItemPage() {
    const dispatch = useDispatch();

    const {itemId} = useParams();

    const item = useSelector((state) => state.items[itemId]);
    const user = useSelector((state) => state.users[item?.userId]);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getOneItemThunk(itemId));
        dispatch(getOneUserThunk(item?.userId));
    }, [itemId, item?.userId, dispatch]);

    if (!item) return null;

    //console.log('item ', item.itemImage);
    //console.log(typeof item?.userId);

    return (
        <div className="item-page-div">
            <div className="item-page-details">
                <div className="item-page-img-div">
                    <img className="item-page-img" src={item?.image} alt="Card Image"></img>
                </div>

                <div className="item-page-text">
                    <div>
                        <p className="item-page-name">{item.name}</p>
                    </div>

                    <div className="item-page-owner-div">
                        <p className="item-page-owner">From {user?.username}</p>
                    </div>

                    <div className="item-desc-div">
                        <p className="item-page-desc">{item.description}</p>
                    </div>

                    <div className="item-price-div">
                        <p className="item-page-price">Price: ${item.price.toFixed(2)}</p>
                        {((item.userId === sessionUser?.id)) ? "" : (<CartComponent item={item} sessionUser={sessionUser} />)}
                    </div>

                    <div>
                        {(item.rating) ? (<p className="item-page-rating">Rating: <i className="fas fa-star card-mini-star" /> {item.rating.toFixed(1)}</p>) : (<p className="item-page-rating">Unrated</p>)}
                    </div>
                </div>
            </div>

            <div className="item-page-reviews-div">
                <h1>Reviews</h1>
                <div>
                    <ItemReviews />
                </div>
            </div>
        </div>
    )
}

export default ItemPage;