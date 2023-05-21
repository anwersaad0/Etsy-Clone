import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserItemsThunk } from "../../store/items";
import ItemDeleteModal from "../ItemDeleteModal";
import OpenModalButton from "../OpenModalButton";


function UserItems() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserItemsThunk());
    }, [dispatch]);

    const items = useSelector(state => Object.values(state.items));
    const sessionUser = useSelector(state => state.session.user);
    
    if (!items) {
        return <h1>No current user songs found</h1>
    }

    return (
        <div>
            <h1>{sessionUser.username}'s Listings</h1>
            {items?.map(({name, id}) => (
                <div>
                    <div>
                        <p>{name}</p>
                        <OpenModalButton buttonText="Delete Listing" modalComponent={<ItemDeleteModal itemId={id} />} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserItems;