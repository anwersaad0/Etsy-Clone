import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { useEffect } from "react";
import './UserCart.css';

function UserCart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const userCart = useSelector(state => Object.values(state.carts));

    useEffect(() => {
        dispatch(getUserCartThunk());
    }, [dispatch]);

    const cartItems = [];

    //console.log('user cart', userCart);

    if (!userCart || !userCart.length) {
        return (
            <div className="user-cart-div">
                <h1 className="user-cart-title">{sessionUser.username}'s Cart</h1>
                <h2>It seems your cart is empty</h2>
            </div>
        )
    }

    return (
        <div className="user-cart-div">
            <h1 className="user-cart-title">{sessionUser.username}'s Cart</h1>
            <div className="user-cart-items-div">
                {userCart?.map(({itemId}) => (
                    <div className="cart-item-div">
                        <h2>{itemId}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserCart;