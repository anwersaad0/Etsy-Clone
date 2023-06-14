import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemsThunk } from "../../store/items";
import { NavLink } from "react-router-dom";
import './AllItems.css';


function AllItems() {
    const dispatch = useDispatch();
    const items = useSelector((state) => Object.values(state.items));
    const itemsRev = items.toReversed();

    const [query, setQuery] = useState("");

    useEffect(() => {
        dispatch(getAllItemsThunk())
    }, [dispatch]);

    
    console.log('items ', items);

    if (!items) return null;

    return (
        <div className="all-items-page">
            <input className="card-search" placeholder="Enter Card Name" onChange={e => setQuery(e.target.value)} />

            {query? (<h2 className="search-text">Search results for {query}</h2>) : ""}

            <div className="all-items-div">
                {itemsRev?.filter(item => {
                    if (query === '') {
                        return item;
                    } else if (item.name.toLowerCase().includes(query.toLocaleLowerCase())) {
                        return item;
                    }
                }).map(({name, price, image, rating, id}) => (
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
        </div>
    )
}

export default AllItems;