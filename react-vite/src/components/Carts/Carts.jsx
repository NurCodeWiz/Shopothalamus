import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUserCartsThunk } from "../../redux/cart";
import { getAllProducts } from "../../redux/products";
import { NavLink } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteCartItemThunk, updateQuantityThunk, allCartItemsThunk } from "../../redux/cartItems";
import './Carts.css';
import { getSingleProduct } from '../../redux/products';
import { useParams } from "react-router-dom";
function Carts() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCarts = useSelector(state => state.carts.Carts);
    const cartItems = useSelector(state => state.cartItems.CartItems);
    const { productId } = useParams();
    console.log('Carts:',userCarts)
    // const allProducts = useSelector(state => state.products.Products);
    const allProducts = useSelector(state => state.products)
    const [quantitySelected, setQuantitySelected] = useState();
    const [refreshQuantity, setRefreshQuantity] = useState(false);
    const [removeItem, setRemoveItem] = useState(false);
    const [initiateCheckout, setInitiateCheckout] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const { closeModal } = useModal();
    const singleProduct = useSelector(state => state.products);
    let currentActiveCart;
    let activeCartId;

    useEffect(() => {
        dispatch(allUserCartsThunk());
        dispatch(getAllProducts());
        dispatch(getSingleProduct(productId));
        if (activeCartId) {
            dispatch(allCartItemsThunk(activeCartId));
        }
        if (!location.pathname.includes('carts')) {
            setShowModalMessage(true);
        }
    }, [dispatch, refreshQuantity, removeItem, quantitySelected, currentActiveCart?.length, userCarts?.length, allProducts?.length, activeCartId,productId]);

    if (!currentUser || !allProducts) {
        return <div className="loading-text">Loading... </div>;
    }

    if (!userCarts.Carts)
    {
        return <div>Loading the cart...</div>;
    }


    if(Object.values(userCarts.Carts)?.length){
        for(let cart of userCarts.Carts){
            if(cart?.isOrdered == false){
                currentActiveCart = cart
            }
        }
    }

    console.log('cart->>xxxxx>>>>>:', currentActiveCart.id)
    if (currentActiveCart?.id) {
        activeCartId = currentActiveCart.id
    }

    if (!cartItems) {
        return <div>Loading cart items...</div>;
    }
    console.log('cartItems', cartItems)

    console.log('cart->>xxxxx>>>>>:', currentActiveCart.id)

    if (!cartItems?.length) {
        return (
            <div className='empty-cart-display'>
                <h1 className='empty-cart-title'>Shopping Cart</h1>
                <hr></hr>
                <div className='empty-cart-message'>Your cart is empty</div>
            </div>
        );
    }

    //return <div> STOP...</div>;

    const cartItemsList = cartItems

    const updateCartItem = async (e, cartItemId, productId) => {
        e.preventDefault();
        const updateData = {
            product_id: productId,
            quantity: parseInt(quantitySelected)
        };
        await dispatch(updateQuantityThunk(updateData, cartItemId));
        setRefreshQuantity(!refreshQuantity);
    };

    const removeCartItem = async (cartItemId) => {
        await dispatch(deleteCartItemThunk(cartItemId));
        setRemoveItem(!removeItem);
    };

    let totalAmount = 0;
    let totalItems = 0;

    const proceedToCheckout = async () => {
        for (let item of cartItemsList) {
            await dispatch(deleteCartItemThunk(item?.id));
            setInitiateCheckout(true);
        }
        setRemoveItem(!removeItem);
        setTimeout(() => {
            closeModal();
        }, 3000);
    };

    if (!allProducts || !allProducts.products)
    {
        return <div>Loading the products...</div>;
    }
    console.log('allProducts', Object.values(allProducts.products));
    let allProducts_new = Object.values(allProducts.products);

    if (!singleProduct || !singleProduct.products) {
        return <div className="loading-text">sss... </div>;
    }
    console.log('singleProduct', singleProduct.products[productId])
    console.log('singleProduct', productId)

    // Problem here for product images
    const allProductImages = singleProduct.images || [];
    return (
        <div className='shopping-cart-container'>
            <h1 className='cart-title'>Shopping Cart</h1>
            {initiateCheckout && <p>Thank you for your purchase!</p>}
            {showModalMessage && initiateCheckout && <p>Closing shortly... </p>}
            <hr className="cart-divider"></hr>
            {!cartItemsList?.length && (<p>Your cart is currently empty.</p>)}
            {cartItemsList?.map(item => (
                <div className='cart-item-details' key={item?.id}>
                    <NavLink to={`/products/${item?.product_id}`} className='cart-item-image-link'>
                    {/* <img src={image_url} alt={singleProduct?.name || 'Product Image'} className="cart-product-image"/> */}
                    <img src={allProductImages.length > 0 ? allProductImages[0].url : 'https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-04-28+at+11.22.28+PM.png' } alt={singleProduct?.name || 'Product Image'} className="cart-product-image"/>
                    </NavLink>
                    <div className='cart-item-info'>
                        <NavLink className='item-details' to={`/products/${item?.product_id}`}>
                            <div className='cart-product-name'>{allProducts_new[(item?.product_id) - 1]?.name}</div>
                            <div className='cart-product-price'>$ {(allProducts_new[(item?.product_id) - 1]?.price * item?.quantity).toFixed(2)}</div>
                            <div hidden>{totalAmount += (allProducts_new[(item?.product_id) - 1]?.price * item?.quantity)}</div>
                            <div hidden>{totalItems += item?.quantity}</div>
                        </NavLink>
                        <div className='item-quantity-update'>
                            Quantity: {item?.quantity}
                            <form onSubmit={(e) => updateCartItem(e, item?.id, item?.product_id)} className='quantity-update-form'>
                                <select onChange={(e) => setQuantitySelected(e.target.value)} className='quantity-select'>
                                    <option value='' disabled selected hidden>Qty:{item?.quantity}</option>
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
                                        <option key={number} value={number}>Qty: {number}</option>
                                    ))}
                                </select>
                                <button type='submit' className='cart-button update-button'>Update</button>
                            </form>
                            <button onClick={() => removeCartItem(item?.id)} className='cart-button delete-button'>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            <hr></hr>
            {totalItems === 1 ?
                <h3 className='subtotal-text'>Subtotal ({totalItems} item): ${totalAmount.toFixed(2)}</h3> :
                <h3 className='subtotal-text'>Subtotal ({totalItems} items): ${totalAmount.toFixed(2)}</h3>
            }
            {cartItemsList?.length > 0 && <button onClick={proceedToCheckout} className='checkout-button'>Proceed to Checkout</button>}
        </div>
    );
}

export default Carts