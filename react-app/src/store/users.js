const GET_USER = "/GET_USER";
const GET_ALL_USERS = "/GET_ALL_USERS";

//actions

const getOneUserAct = (user) => {
    return {
        type: GET_USER,
        user
    }
}

const getAllUsersAct = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

//thunks

export const getOneUserThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);

    if (res.ok) {
        const user = await res.json();
        dispatch(getOneUserAct(user));
        return user;
    }
}

export const getAllUsersThunk = () => async (dispatch) => {
    const res = await fetch('/api/users');

    if (res.ok) {
        const { users } = await res.json();
        dispatch(getAllUsersAct(users));
        return users;
    }
}

//reducer

const initState = {};
function userReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_USER:
            newState = {...state};
            newState[action.user.id] = action.user;
            return newState;
        case GET_ALL_USERS:
            newState = {...state};
            action.users.forEach(user => {
                newState[user.id] = user
            });
            return newState;            
        default:
            return state;
    }
}

export default userReducer;