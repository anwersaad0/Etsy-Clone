import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItemsThunk } from "../../store/items";


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
                    <p>{name}</p>
                </div>
            ))}
        </div>
    )
}

export default AllItems;