const ALL_REVIEWS = 'ALL_REVIEWS';
const GET_ALL_REVIEWS_PRODUCT = 'GET_ALL_REVIEWS_PRODUCT';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';
const CREATE_NEW_REVIEW = 'CREATE_NEW_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

const allReviews = (reviews) => {
    return{
        type: ALL_REVIEWS,
        reviews
    }
}

const getAllReviewsProduct = (reviews) => {
    return{
        type: GET_ALL_REVIEWS_PRODUCT,
        reviews
    }
}
const getUserReviews = (reviews) => {
    return{
        type: GET_USER_REVIEWS,
        reviews
    }
}
const createReview = (newReview) => {
    return{
        type: CREATE_NEW_REVIEW,
        newReview
    }
}
const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }

}
const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}







// get all reviews by product Id
export const getAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')
    if (!response.ok) {
        throw new Error("Failed to get reviews")
    }
    const data = await response.json()
    dispatch(allReviews(data))
}


export const reviewsByProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`)
    if(!response.ok){
        throw new Error ('Failed to get reviews')
    }
    const data = await response.json()
    dispatch(getAllReviewsProduct(data))
    // console.log("reviews:",data)
}

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch (`/api/reviews/current`)
    if(!response.ok){
        throw new Error('Failed to get current user reviews.')
    }
    const data = await response.json()
    dispatch(getUserReviews(data))
    return data
}

export const createReviewThunk = (productId, reviewFormData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            body: reviewFormData,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(`Failed to create new review. Server responded with: ${JSON.stringify(data)}`);
        }

        const data = await response.json();
        dispatch(createReview(data));
        return data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// export const updateReviewThunk = (reviewId, updatedReview) => async (dispatch) => {
//     const response = await fetch(`/api/reviews/${reviewId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedReview),
//     })
//     if(!response.ok){
//         throw new Error('Failed to update review')
//     }
//     const data = await response.json()
//     dispatch(updateReview(data))
//     return data
// }

export const updateReviewThunk = (reviewId, updatedReview) => async (dispatch) => {
    const response = await fetch (`/api/reviews/${reviewId}/edit`, {
        method: 'PUT',
        body: updatedReview
    })
    if(!response.ok){
        throw new Error('Failed to update review')
    }
    const data = await response.json()
    dispatch(updateReview(data))
    return data
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if(!response.ok){
        throw new Error ('Failed to delete review')
    }
    // const data = await response.json()
    dispatch(deleteReview(reviewId))
}

const initialState = {
    reviews: [],
};
function reviewReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_REVIEWS_PRODUCT:{
            return{...state, reviews: action.reviews}
        }
        case GET_USER_REVIEWS: {
            return{...state, ...action.reviews}
        }
        case ALL_REVIEWS: {
            return {...state, reviews: action.reviews}
        }
        case CREATE_NEW_REVIEW: {
            // console.log('+++++++++', state)
            // return{...state, ...action.newReview}
            // const newReviewId = action.newReview.id;
            // return {
            // ...state,
            // reviews: {
            //     ...state.reviews,
            //     [newReviewId]: action.newReview
            // const newState = {...state}
            // newState.reviews[action.newReview.id] = action.newReview
            // return newState
            // const { id } = action.newReview; // Extract the ID from the new review
            const updatedReviews = {
                ...state.reviews,
                [action.newReview.id]: action.newReview
              };
            return {
            //    ...state,
            //    reviews: {
            //    ...state.reviews,
            //    [action.newReview.id]: action.newReview // Add the new review to the reviews object using its ID as the key
            //    }
                ...state,
                reviews: updatedReviews

           };

        }
        case UPDATE_REVIEW: {
            return{...state, ...action.review}
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState.reviews[action.reviewId]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
