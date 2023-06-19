const GET_CART = "/GET_CART";

const getCartAct = (cart) => {
    return {
        type: GET_CART,
        cart
    }
}

const initState = {}
function cartReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_CART:
            return newState;
        default:
            return state;
    }
}

export default cartReducer;