import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUserCartsThunk } from "../../redux/cart";
import { getAllProducts } from "../../redux/products";
import { NavLink } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteCartItemThunk, updateQuantityThunk } from "../../redux/cartItems";
import './Carts.css';


function Carts() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userCarts = useSelector(state => state.carts.Carts);
    console.log('Carts:',userCarts)
    // const allProducts = useSelector(state => state.products.Products);
    const { allProducts } = useSelector(state => state.products)
    const [quantitySelected, setQuantitySelected] = useState();
    const [refreshQuantity, setRefreshQuantity] = useState(false);
    const [removeItem, setRemoveItem] = useState(false);
    const [initiateCheckout, setInitiateCheckout] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const { closeModal } = useModal();

    let currentActiveCart;

    useEffect(() => {
        dispatch(allUserCartsThunk());
        dispatch(getAllProducts());
        if (!location.pathname.includes('carts')) {
            setShowModalMessage(true);
        }
    }, [dispatch, refreshQuantity, removeItem, quantitySelected, currentActiveCart?.length, userCarts?.length, allProducts?.length]);

    if (!currentUser || !allProducts?.length) {
        // return <div className="loading-text">Loading... </div>;
    }


    if (userCarts?.length > 0) {
        for (let cart of userCarts) {
            if (!cart?.isOrdered) {
                currentActiveCart = cart;
            }
        }
    }

    if (!userCarts?.length) {
        return (
            <div className='empty-cart-display'>
                <h1 className='empty-cart-title'>Shopping Cart</h1>
                <hr></hr>
                <div className='empty-cart-message'>Your cart is empty</div>
            </div>
        );
    }

    const cartItemsList = currentActiveCart?.cart_items;

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
                        <img src={allProducts[(item?.product_id) - 1]?.image_url} className="cart-product-image"/>
                    </NavLink>
                    <div className='cart-item-info'>
                        <NavLink className='item-details' to={`/products/${item?.product_id}`}>
                            <div className='cart-product-name'>{allProducts[(item?.product_id) - 1]?.name}</div>
                            <div className='cart-product-price'>$ {(allProducts[(item?.product_id) - 1]?.price * item?.quantity).toFixed(2)}</div>
                            <div hidden>{totalAmount += (allProducts[(item?.product_id) - 1]?.price * item?.quantity)}</div>
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
