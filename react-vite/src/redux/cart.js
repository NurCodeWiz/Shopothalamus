const GET_ALL_USERS_CARTS = '/all/carts'
const GET_ACTIVE_CART ='/carts/active'
const CREATE_NEW_CART = '/carts/new'

// ACTION TYPES
const getAllCarts = (carts) => {
    console.log('Dispatching all carts:', carts);
    return{
        type: GET_ALL_USERS_CARTS,
        carts
    }
}

const getActiveCart = (cart) => {
    return {
        type: GET_ACTIVE_CART,
        cart
    }
}

const createCart = (cart) => {
    return {
        type: CREATE_NEW_CART,
        cart
    }
}


// THUNKS

// get all curr user's carts (ordered and active)
// get all curr user's carts (ordered and active)
export const allUserCartsThunk = () => async (dispatch) => {
    const response = await fetch('/api/carts/all');
    if (!response.ok) {
        console.error('Failed to get user carts:', response.statusText);
        throw new Error('Failed to get user carts');
    }
    const data = await response.json();
    console.log('Fetched all carts:', data);  // Log fetched data
    dispatch(getAllCarts(data));
    return data;
}



export const activeCartThunk = () => async (dispatch) => {
    const response = await fetch ('/api/carts/active')
    if(!response.ok){
        throw new Error('Failed to get active cart')
    }
    const data = await response.json()
    dispatch(getActiveCart(data))
    return data
}

//  create new cart
export const createCartThunk = () => async (dispatch) => {
    const response = await fetch(`/api/carts/new`, {
        method: 'POST'
    })
    if(!response.ok){
        throw new Error ('Failed to create new cart')
    }
    const data = await response.json()
    dispatch(createCart(data))
    return data
}
const initialState = {
    Carts: [],
    // other properties if there are any
  };

// REDUCER
function cartReducer (state = initialState, action){
    console.log('Reducer action:', action);
    switch (action.type) {
        case GET_ALL_USERS_CARTS:
            return { ...state, Carts: action.carts };
        case GET_ACTIVE_CART:
            return { ...state, Carts: [action.cart] }; // Assuming `action.cart` returns only the active cart
        case CREATE_NEW_CART:
            return { ...state, Carts: [...state.Carts, action.cart] };
        default:
            return state;
    }

}

export default cartReducer
