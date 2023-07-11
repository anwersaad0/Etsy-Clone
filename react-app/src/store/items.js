const GET_ALL_ITEMS = "/GET_ALL_ITEMS";
const GET_USER_ITEMS = "/GET_USER_ITEMS";
const GET_ONE_ITEM = "/GET_ONE_ITEM";
const GET_MULT_ITEMS = "/GET_MULT_ITEMS";
const CREATE_ITEM = "/CREATE_ITEM";
const EDIT_ITEM = "/EDIT_ITEM";
const DELETE_ITEM = "/DELETE_ITEM";
const ADD_REMOVE_CART = '/ADD_REMOVE_CART';

//actions

const getAllItemsAct = (items) => {
    return {
        type: GET_ALL_ITEMS,
        items
    }
}

const getUserItemsAct = (items) => {
    return {
        type: GET_USER_ITEMS,
        items
    }
}

const getOneItemAct = (item) => {
    return {
        type: GET_ONE_ITEM,
        item
    }
}

const getMultItemsAct = (items) => {
    return {
        type: GET_MULT_ITEMS,
        items
    }
}

const createItemAct = (item) => {
    return {
        type: CREATE_ITEM,
        item
    }
}

const editItemAct = (item) => {
    return {
        type: EDIT_ITEM,
        item
    }
}

const deleteItemAct = (itemId) => {
    return {
        type: DELETE_ITEM,
        itemId
    }
}

const addOrRemoveFromCartAct = (item) => {
    return {
        type: ADD_REMOVE_CART,
        item
    }
}

//thunks

export const getAllItemsThunk = () => async (dispatch) => {
    const res = await fetch("/api/items");

    if (res.ok) {
        const { items } = await res.json();
        dispatch(getAllItemsAct(items));
    } else {
        return ("getAllItems response not ok");
    }
}

export const getUserItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/items/current');

    if (res.ok) {
        const { items } = await res.json();
        dispatch(getUserItemsAct(items));
    } else {
        return ("getUserItems response not ok");
    }
}

export const getOneItemThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`);

    if (res.ok) {
        const item = await res.json();
        dispatch(getOneItemAct(item));
        //console.log('from thunk', item);
        return item;
    } else {
        return ("getOneItem response not ok");
    }
}

export const getMultItemsThunk = (itemIds) => async (dispatch) => {
    const items = [];

    for (let itemId of itemIds) {
        const res = await fetch(`/api/items/${itemId}`);

        if (res.ok) {
            const item = await res.json();
            items.push(item);
        }
    }

    dispatch(getMultItemsAct(items));
    return items;

    // const res = await fetch(`/api/items/${itemIds}`);

    // if (res.ok) {
    //     const items = await res.json();
    //     dispatch(getMultItemsAct(items));
    //     return items;
    // } else {
    //     return ("getMultItems response not ok");
    // }
}

export const createItemThunk = (item) => async (dispatch) => {
    const res = await fetch('/api/items/new', {
        method: 'POST',
        body: item
    });

    if (res.ok) {
        const item = await res.json();
        await dispatch(createItemAct(item));
        return item;
    } else {
        return ("createItem response not ok")
    }
}

export const editItemThunk = (item, itemId) => async (dispatch) => {
    //const itemId = parseInt(item.get('id'));
    console.log('item id ', item);

    const res = await fetch(`/api/items/edit/${itemId}`, {
        method: 'PUT',
        body: item
    });

    if (res.ok) {
        const item = await res.json();
        dispatch(editItemAct(item));
        return item;
    } else {
        return ("editItem response not ok");
    }
}

export const deleteItemThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/delete/${itemId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        dispatch(deleteItemAct(itemId));
        return {'message': 'Delete Successful'};
    } else {
        return ("Item could not be deleted");
    }
}

export const addOrRemoveFromCartThunk = (itemId, userId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}/cart/${userId}`, {
        method: 'POST',
        body: itemId, userId
    });

    if (res.ok) {
        const item = await res.json();
        dispatch(addOrRemoveFromCartAct(item));
        return item;
    }
}

//reducer

const initState = {};
function itemReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_ALL_ITEMS:
            newState = {...state};
            action.items.forEach(item => {
                newState[item.id] = item;
            });
            return newState;
        case GET_USER_ITEMS:
            const userState = action.items.reduce( (userItems, item) => {
                userItems[item.id] = item;
                return userItems;
            }, {});
            return {...userState};
        case GET_ONE_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        case GET_MULT_ITEMS:
            const multItemsState = action.items.reduce( (cartItems, item) => {
                cartItems[item.id] = item;
                return cartItems;
            }, {});
            return {...multItemsState};
        case CREATE_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        case EDIT_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        case DELETE_ITEM:
            newState = {...state};
            delete newState[action.itemId];
            return newState;
        case ADD_REMOVE_CART:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        default:
            return state
    }
}

export default itemReducer;