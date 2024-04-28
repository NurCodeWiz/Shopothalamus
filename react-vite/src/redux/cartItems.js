const GET_ALL_CART_ITEMS = '/carts/cartItems'
const ADD_PRODUCT_TO_CART = '/carts/cartId/new'
const EDIT_PRODUCT_QUANTITY = '/carts/cartId/edit'
const DELETE_CART_PRODUCT = '/carts/cartId/delete'

// ACTION TYPES
const getAllCartItems = (items) => {
    return {
        type:GET_ALL_CART_ITEMS,
        items
    }
}
const addItemToCart = (item) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        item
    }
}
const updateQuantity = (item) =>{
    return {
        type: EDIT_PRODUCT_QUANTITY,
        item
    }
}
const deleteCartItem = (item) => {
    return {
        type: DELETE_CART_PRODUCT,
        item
    }
}

// THUNKS
// get all items
export const allCartItemsThunk = (cartId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartId}`)
    if(!response.ok){
        throw new Error('Failed to get Cart Items.')
    }
    const data = await response.json()
    dispatch(getAllCartItems(data))
    return data
}

// add new item to cart
export const addItemToCartThunk = (addItem, cartId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cartId}/products/new`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(addItem)
    })
    if(!response.ok){
        throw new Error ('Failed to add item to cart.')
    }
    const data = await response.json()
    dispatch(addItemToCart(data))
    return data
}

// update qty
export const updateQuantityThunk = (updateItem, cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/carts/active/${cartItemId}/edit`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateItem)
    })
    if(!response.ok){
        throw new Error('Failed to update cart item quantity.')
    }
    const data = await response.json()
    dispatch(updateQuantity(data))
    return data
}

// delete cart item
export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
    const response = await fetch(`/api/carts/active/${cartItemId}/delete`, {
        method: 'DELETE'
    })
    if(!response.ok){
        throw new Error ('Failed to remove cart item from cart.')
    }
    const data = await response.json()
    dispatch(deleteCartItem(data))
}

// REDUCER
function cartItemsReducer (state ={}, action){
    switch(action.type){
        case GET_ALL_CART_ITEMS:{
            return{...state, ...action.items}
        }
        case ADD_PRODUCT_TO_CART: {
            return{...state, ...action.item}
        }
        case EDIT_PRODUCT_QUANTITY:{
            return{...state, ...action.item}
        }
        case DELETE_CART_PRODUCT:{
            const deleteState = {...state}
            delete deleteState[action.item]
            return deleteState
        }
        default:
            return state
    }
}

export default cartItemsReducer
