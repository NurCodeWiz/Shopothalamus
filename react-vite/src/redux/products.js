
const ALL_PRODUCTS = "productsReducer/ALL_PRODUCTS"
const PRODUCTS_BY_CATEGORY = "productsReducer/PRODUCTS_BY_CATEGORY"
const SINGLE_PRODUCT = "productsReducer/SINGLE_PRODUCT"
const NEW_PRODUCT = "productsReducer/NEW_PRODUCT"
const NEW_PRODUCT_IMAGE = 'productsReducer/NEW_PRODUCT_IMAGE'

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
function newProduct(product) {
    return {
        type: NEW_PRODUCT,
        product
    }
}
const newProductImage = (productId, image) => ({
    type: NEW_PRODUCT_IMAGE,
    productId,
    image
});


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
        console.log("singleproductdata:",data)
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const createNewProduct = (productFormData) => async (dispatch) => {
    const response = await fetch('/api/products/', {
        method: "POST",
        body: productFormData
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(newProduct(data))
        return data
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const addProductImageThunk = (productId, formData) => async dispatch => {
    const response = await fetch(`/api/products/${productId}/product_images`, {
        method: 'POST',
        body: formData
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(newProductImage(productId, data))
    }
}



const initialState = { products: null };

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_PRODUCTS:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products) }
        case PRODUCTS_BY_CATEGORY:
            return {...state, products: action.products, allProductsIds: Object.keys(action.products)}
        case SINGLE_PRODUCT: {

            const newState = {...state};
            if (newState.products === null) {
                newState.products = {};
            }
            newState.products[action.product.id] = action.product;
            return newState;
        }
        case NEW_PRODUCT: {
            // const newState = {...state}
            // newState.products[action.product.id] = action.product
            // return newState
            const products = state.products || {};
            products[action.product.id] = action.product;
            return { ...state, products };
        }

        case NEW_PRODUCT_IMAGE: {
            // const newState = {...state}
            // const product = newState.products[+action.productId];
            // product.product_images = { ...product.product_images }
            // product.product_images[action.image.id] = action.image
            // return newState;
            const products = state.products || {};
            const product = products[action.productId] || { product_images: {} };
            product.product_images[action.image.id] = action.image;
            products[action.productId] = product;
            return { ...state, products };
        }
        default:
            return state;
    }
}
