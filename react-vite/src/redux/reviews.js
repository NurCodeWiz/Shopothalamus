const ALL_REVIEWS = 'ALL_REVIEWS';
const GET_ALL_REVIEWS_PRODUCT = 'GET_ALL_REVIEWS_PRODUCT';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';

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




function reviewReducer(state = {}, action){
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
        default:
            return state
    }
}

export default reviewReducer
