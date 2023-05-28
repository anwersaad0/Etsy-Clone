import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserItemsThunk } from "../../store/items";
import ItemDeleteModal from "../ItemDeleteModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './UserItems.css';


function UserItems() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserItemsThunk());
    }, [dispatch]);

    const items = useSelector(state => Object.values(state.items));
    const sessionUser = useSelector(state => state.session.user);

    console.log(items);
    
    if (!items) {
        return <h1>No current user items found</h1>
    }

    return (
        <div className="user-items-div">
            <h1 className="user-items-title">{sessionUser.username}'s Listings</h1>
            <div className="all-user-items-div">
                {items?.map(({name, price, image, rating, id}) => (
                    <div className="user-card-details" key={id}>
                        <NavLink className='user-card-mini-details' exact to={`/items/${id}`}>
                            <div className="card-mini-img-div">
                                <img className="card-mini-img" src={image} alt="Card Image"></img>
                            </div>
                            <div className="card-mini-text">
                                <p className="card-mini-name">{name}</p>
                                <p className="card-mini-price">Price: ${price.toFixed(2)}</p>
                                <p className="card-mini-rating">Player Rating: <i className="fas fa-star card-mini-star" /> {(rating) ? rating.toFixed(1) : "Unrated"}</p>
                            </div>
                        </NavLink>

                        <div className="user-items-options">
                            <button className="edit-item-btn" onClick={() => history.push(`/items/${id}/edit`)}>Edit Listing</button>
                            <OpenModalButton buttonClass="delete-item-btn" buttonText="Delete Listing" modalComponent={<ItemDeleteModal itemId={id} />} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserItems;