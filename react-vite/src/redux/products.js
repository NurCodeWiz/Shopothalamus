
const ALL_PRODUCTS = "productsReducer/ALL_PRODUCTS"
const PRODUCTS_BY_CATEGORY = "productsReducer/PRODUCTS_BY_CATEGORY"
const SINGLE_PRODUCT = "productsReducer/SINGLE_PRODUCT"


function allProducts(products) {
    return {
        type: ALL_PRODUCTS,
        products
    }
}

function productsByCategory(products) {
    return {
        type: PRODUCTS_BY_CATEGORY,
        products
    }
}

function singleProduct(product) {
    return {
        type: SINGLE_PRODUCT,
        product
    }
}


export const getAllProducts = () => async(dispatch) => {
    const response = await fetch('/api/products/')
    if (response.ok) {
        const data = await response.json()
        dispatch(allProducts(data))
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const getProductsByCategory = (category) => async(dispatch) => {
    const response = await fetch(`/api/products/${category}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(productsByCategory(data))
        console.log("data:",data)
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const getSingleProduct = (productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(singleProduct(data))
    } else {
        const errors = await response.json();
        return errors;
    }
}


const initialState = { products: null };

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_PRODUCTS:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products) }
        case PRODUCTS_BY_CATEGORY:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products)}
        case SINGLE_PRODUCT:
            return {...state, products: action.product}
        default:
            return state;
    }
}
