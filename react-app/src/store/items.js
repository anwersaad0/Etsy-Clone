const GET_ALL_ITEMS = "/GET_ALL_ITEMS";
const GET_ONE_ITEM = "/GET_ONE_ITEM";
const CREATE_ITEM = "/CREATE_ITEM";

//actions

const getAllItemsAct = (items) => {
    return {
        type: GET_ALL_ITEMS,
        items
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

//reducer

const initState = {};
function itemReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_ALL_ITEMS:
            newState = {...state}
            action.items.forEach(item => {
                newState[item.id] = item
            });
            return newState;
        default:
            return state
    }
}

export default itemReducer;