import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemsThunk } from "../../store/items";
import { NavLink } from "react-router-dom";


function AllItems() {
    const dispatch = useDispatch();
    const items = useSelector((state) => Object.values(state.items));

    useEffect(() => {
        dispatch(getAllItemsThunk())
    }, [dispatch]);

    
    console.log('items ', items);

    if (!items) return null;

    return (
        <div>
            {items?.map(({name, id}) => (
                <div>
                    <NavLink exact to={`/items/${id}`}>{name}</NavLink>
                </div>
            ))}
        </div>
    )
}

export default AllItems;