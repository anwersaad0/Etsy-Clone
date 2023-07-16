import { useDispatch } from "react-redux";
import { addOrRemoveFromCartThunk } from "../../store/items";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CartComponent({item, sessionUser, btnClass="add-to-cart-btn"}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUserCart = useSelector(state => Object.values(state.carts));

    let isInCart = 0;
    
    function checkCart() {
        for (let cartItem of sessionUserCart) {
            if (cartItem.itemId === item.id) {
                isInCart = 1;
            }
        }
    }

    useEffect(() => {
        dispatch(getUserCartThunk());
    }, [dispatch, sessionUserCart]);

    const handleCart = async (e) => {
        e.preventDefault();

        if (sessionUser) {
            await dispatch(addOrRemoveFromCartThunk(item.id, sessionUser.id));

            if (isInCart > 0) {
                isInCart = 0;
            }
        }
    }

    checkCart();

    return (
        <div className="add-to-cart-div">
            <button className={btnClass} onClick={handleCart}>
                {(isInCart > 0) ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    )
}

export default CartComponent;