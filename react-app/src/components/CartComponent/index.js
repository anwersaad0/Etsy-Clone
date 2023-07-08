import { useDispatch } from "react-redux";
import { addOrRemoveFromCartThunk } from "../../store/items";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CartComponent({item, sessionUser}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUserCart = useSelector(state => Object.values(state.carts));

    useEffect(() => {
        dispatch(getUserCartThunk());
    }, [dispatch]);

    const handleCart = (e) => {
        e.preventDefault();

        if (sessionUser) {
            dispatch(addOrRemoveFromCartThunk(item.id, sessionUser.id));
        }

        if (isInCart > 0) {
            isInCart = 0;
        }
    }

    let isInCart = 0;
    for (let cartItem of sessionUserCart) {
        if (cartItem.itemId === item.id) {
            isInCart = 1;
        }
    }

    return (
        <div className="add-to-cart-div">
            <button className="add-to-cart-btn" onClick={handleCart}>
                {(isInCart) ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    )
}

export default CartComponent;