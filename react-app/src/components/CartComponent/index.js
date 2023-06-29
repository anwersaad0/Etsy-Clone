import { useDispatch } from "react-redux";
import { addOrRemoveFromCartThunk } from "../../store/items";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function CartComponent({item, sessionUser}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCart = (e) => {
        e.preventDefault();

        if (sessionUser) {
            dispatch(addOrRemoveFromCartThunk(item.id, sessionUser.id));
        }
    }

    let cartBtn = <button className="add-to-cart-btn" onClick={handleCart}>Add to Cart</button>;

    return (
        <div className="add-to-cart-div">
            {cartBtn}
        </div>
    )
}

export default CartComponent;