import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemsThunk } from "../../store/items";
import { NavLink } from "react-router-dom";
import './AllItems.css';


function AllItems() {
    const dispatch = useDispatch();
    const items = useSelector((state) => Object.values(state.items));
    const itemsRev = items.toReversed();

    useEffect(() => {
        dispatch(getAllItemsThunk())
    }, [dispatch]);

    
    console.log('items ', items);

    if (!items) return null;

    return (
        <div className="all-items-div">
            {itemsRev?.map(({name, price, image, rating, id}) => (
                <NavLink className='card-mini-details' exact to={`/items/${id}`}>
                    <div className="card-mini-div">
                        <div className="card-mini-img-div">
                            <img className="card-mini-img" src={image} alt="Card Image"></img>
                        </div>
                        <div className="card-mini-text">
                            <p className="card-mini-name">{name}</p>
                            <p className="card-mini-price">Price: ${price.toFixed(2)}</p>
                            <p className="card-mini-rating">Player Rating: <i className="fas fa-star card-mini-star" /> {(rating) ? rating.toFixed(1) : "Unrated"}</p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default AllItems;