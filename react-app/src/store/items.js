const GET_ALL_ITEMS = "/GET_ALL_ITEMS";
const GET_ONE_ITEM = "/GET_ONE_ITEM";
const CREATE_ITEM = "/CREATE_ITEM";
const EDIT_ITEM = "/EDIT_ITEM";

//actions

const getAllItemsAct = (items) => {
    return {
        type: GET_ALL_ITEMS,
        items
    }
}

const getOneItemAct = (item) => {
    return {
        type: GET_ONE_ITEM,
        item
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

export const getOneItemThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`);

    if (res.ok) {
        const item = await res.json();
        dispatch(getOneItemAct(item));
        console.log('from thunk', item);
        return item;
    } else {
        return ("getOneItem response not ok");
    }
}

export const createItemThunk = (item) => async (dispatch) => {
    const res = await fetch('/api/items/new', {
        method: 'POST',
        body: item
    });

    //console.log('response ', res);

    if (res.ok) {
        const item = await res.json();
        dispatch(createItemAct(item));
        return item;
    } else {
        return ("createItem response not ok")
    }
}

export const editItemThunk = (item) => async (dispatch) => {
    const itemId = parseInt(item.get('id'));
    console.log('item id ', itemId);

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

//reducer

const initState = {};
function itemReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_ALL_ITEMS:
            newState = {...state};
            action.items.forEach(item => {
                newState[item.id] = item
            });
            return newState;
        case GET_ONE_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        case CREATE_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        case EDIT_ITEM:
            newState = {...state};
            newState[action.item.id] = action.item;
            return newState;
        default:
            return state
    }
}

export default itemReducer;