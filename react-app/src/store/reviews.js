const GET_REVIEWS = "/GET_REVIEWS";
const CREATE_REVIEW = "/CREATE_REVIEW";
const EDIT_REVIEW = "/EDIT_REVIEW";
const DELETE_REVIEW = "/DELETE_REVIEW";

//actions

const getReviewsAct = (revs) => {
    return {
        type: GET_REVIEWS,
        revs
    }
}

const createReviewAct = (rev) => {
    return {
        type: CREATE_REVIEW,
        rev
    }
}

const editReviewAct = (rev) => {
    return {
        type: EDIT_REVIEW,
        rev
    }
}

const deleteReviewAct = (revId) => {
    return {
        type: DELETE_REVIEW,
        revId
    }
}

//thunks

export const getReviewsThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}/reviews`);

    if (res.ok) {
        const { reviews } = await res.json();
        dispatch(getReviewsAct(reviews));
    } else {
        return ("getReviews response not ok");
    }
}

export const createReviewThunk = (itemId, rev) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}/reviews`, {
        method: 'POST',
        body: rev
    });

    console.log('res', res);

    if (res.ok) {
        const rev = await res.json();
        dispatch(createReviewAct(rev));
        return rev;
    } else {
        return ("createReview response not ok")
    }
}

export const editReviewThunk = (rev, revId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${revId}`, {
        method: 'PUT',
        body: rev
    });

    if (res.ok) {
        const rev = await res.json();
        dispatch(editReviewAct(rev));
        return rev;
    } else {
        return ("editReview response not ok");
    }
}

export const deleteReviewThunk = (revId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/delete/${revId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteReviewAct(revId));
        return {'message': 'Delete Successful'};
    } else {
        return ("Review could not be deleted");
    }
}

//reducer
const initState = {};
function reviewReducer(state = initState, action) {
    let newState;
    switch(action.type) {
        case GET_REVIEWS:
            newState = {...state};
            //console.log('rev', action.revs);
            action.revs.forEach(review => {
                newState[review.id] = review;
            });
            // console.log('newState', newState)
            return newState;
        case CREATE_REVIEW:
            newState = {...state};
            newState[action.rev.id] = action.rev;
            return newState;
        case EDIT_REVIEW:
            newState = {...state};
            newState[action.rev.id] = action.rev;
            return newState;
        case DELETE_REVIEW:
            newState = {...state};
            delete newState[action.revId];
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;