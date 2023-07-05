const GET_USER_CART = "/GET_USER_CART";

const getUserCartAct = (carts) => {
    return {
        type: GET_USER_CART,
        carts
    }
}

export const getUserCartThunk = () => async (dispatch) => {
    const res = await fetch('/api/carts/current');

    if (res.ok) {
        const userCart = await res.json();
        dispatch(getUserCartAct(userCart));
    }
}

const initState = {}
function cartReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_USER_CART:
            const userState = action.carts.reduce((userCarts, cart) => {
                userCarts[cart.user_id] = cart;
                return userCarts; 
            }, {});
            return {...userState};
        default:
            return state;
    }
}

export default cartReducer;