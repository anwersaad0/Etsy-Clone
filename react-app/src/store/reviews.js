const GET_REVIEWS = "/GET_REVIEWS";
const CREATE_REVIEW = "/CREATE_REVIEW";

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
            console.log('newState', newState)
            return newState;
        case CREATE_REVIEW:
            newState = {...state};
            newState[action.rev.id] = action.rev;
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;