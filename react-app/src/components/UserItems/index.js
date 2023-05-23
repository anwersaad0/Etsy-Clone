import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserItemsThunk } from "../../store/items";
import ItemDeleteModal from "../ItemDeleteModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";


function UserItems() {
    const dispatch = useDispatch();
    const history = useHistory();

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
                    </div>

                    <div>
                        <button onClick={() => history.push(`/items/${id}/edit`)}>Edit Listing</button>
                        <OpenModalButton buttonText="Delete Listing" modalComponent={<ItemDeleteModal itemId={id} />} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserItems;