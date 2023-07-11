import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { getAllItemsThunk } from "../../store/items";
import { useEffect } from "react";
import './UserCart.css';

function UserCart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const userCart = useSelector(state => Object.values(state.carts));

    const cartItemIds = [];
    for (let cart of userCart) {
        cartItemIds.push(cart.itemId);
    }

    const items = useSelector(state => Object.values(state.items));

    useEffect(() => {
        dispatch(getUserCartThunk());
        dispatch(getAllItemsThunk());
    }, [dispatch]);

    let sortedItems = [];

    for (let item of items) {
        for (let id of cartItemIds) {
            if (id === item.id) {
                sortedItems.push(item);
            }
        }
    }
    
    console.log('user cart', sortedItems);

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
                    <div key={itemId} className="cart-item-div">
                        <h2>{itemId}</h2>
                    </div>
                ))}
            </div>

            <div>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default UserCart;