import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { getAllItemsThunk } from "../../store/items";
import { useEffect } from "react";
import CartComponent from "../CartComponent";
import './UserCart.css';

function UserCart() {
    const dispatch = useDispatch();
    const history = useHistory();

    let totalCost = 0;

    const sessionUser = useSelector(state => state.session.user);
    const userCart = useSelector(state => Object.values(state.carts));

    const cartItemIds = [];
    for (let cart of userCart) {
        cartItemIds.push(cart.itemId);
    }

    const items = useSelector(state => Object.values(state.items));
    let sortedItems = [];

    useEffect(() => {
        dispatch(getUserCartThunk());
        dispatch(getAllItemsThunk());
    }, [dispatch]);

    for (let item of items) {
        for (let id of cartItemIds) {
            if (id === item.id) {
                sortedItems.push(item);
                totalCost += item.price;
            }
        }
    }
    
    console.log('user cart', sortedItems);

    if (!userCart || !userCart.length) {
        return (
            <div className="user-cart-div">
                <h1 className="user-cart-title">{sessionUser.username}'s Cart</h1>
                
                <div className="user-cart-items-div">
                    <h2>It seems your cart is empty</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="user-cart-div">
            <h1 className="user-cart-title">{sessionUser.username}'s Cart</h1>
            <div className="user-cart-items-div">
                {sortedItems?.map((item) => (
                    <div key={item?.id} className="cart-item-div">
                        <div className="cart-item-pic-div">
                            <img className="cart-item-pic" src={item?.image} alt={item?.name}></img>
                        </div>
                        <div className="cart-item-text">
                            <NavLink className="cart-item-name" exact to={`/items/${item?.id}`}>{item?.name}</NavLink>
                            <p className="cart-item-price">Price: ${item?.price.toFixed(2)}</p>
                            <div className="cart-page-btn-div">
                                <CartComponent btnClass="cart-page-btn" item={item} sessionUser={sessionUser} />
                            </div>
                        </div>
                    </div>
                ))}

                <div>
                    <p className="total-price">Total Cost: ${totalCost.toFixed(2)}</p>
                </div>

                <div>
                    <button onClick={() => alert("Feature Coming Soon!")} className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>

        </div>
    )
}

export default UserCart;