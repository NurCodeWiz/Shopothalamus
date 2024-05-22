// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addOrderThunk } from "../../redux/orders";
// import { emptyCartThunk } from '../../redux/cart';
// import './Checkout.css';
// import { useCart } from '../../context/CartProvider';

// function Checkout() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { setIsOpen } = useCart();
//     const currentUser = useSelector(state => state.session.user);
//     const cartItems = useSelector(state => state.cartItems.CartItems);
//     const products = useSelector(state => state.products.products);
//     const userCarts = useSelector(state => state.carts.Carts);

//     let currentActiveCart;



//     if(userCarts && userCarts.Carts && Object.values(userCarts.Carts)?.length){
//         for(let cart of userCarts.Carts){
//             console.log('cart', cart)
//             if(cart?.isOrdered == false && cart?.user_id == currentUser?.id){
//                 currentActiveCart = cart
//             }
//         }
//     }

//     if (!cartItems || !products) return <div className="loading-text">Loading...</div>;

//     const placeOrder = async (e) => {
//         e.preventDefault();

//         const order = {
//             cartId: currentActiveCart?.id,
//             productOrders: cartItems.map(item => ({
//                 productId: item.product_id,
//                 quantity: item.quantity
//             }))
//         };

//         const created = await dispatch(addOrderThunk(order));

//         if (created.byId) {
//             dispatch(emptyCartThunk());
//             setIsOpen(false);
//             navigate('/orders');
//         }
//     };

//     return (
//         <div id='checkout'>
//             <h2>Your Cart</h2>
//             <div className="image-slices">
//             <img
//                 src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                 alt="Decorative"
//                 className="slice slice1"
//             />
//             <img
//                 src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                 alt="Decorative"
//                 className="slice slice2"
//             />
//             </div>
//             <div className="checkout-products">
//                 {cartItems.map(item => {
//                     const product = products[item.product_id];
//                     return (
//                         <div key={item.id} className="order-item">
//                             <div className="order-item-details">
//                                 <h3>{product.name}</h3>
//                                 <p>Quantity: {item.quantity}</p>
//                                 <p>Price: ${product.price}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//             <button onClick={placeOrder} className='placeOrder-button'>Place Order</button>
//         </div>
//     );
// }
// export default Checkout;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addOrderThunk } from "../../redux/orders";
// import { emptyCartThunk } from '../../redux/cart';
// import { useCart } from '../../context/CartProvider';
// import './Checkout.css';


// function Checkout() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { setIsOpen } = useCart();
//     const currentUser = useSelector(state => state.session.user);
//     const cartItems = useSelector(state => state.cartItems.CartItems);
//     const products = useSelector(state => state.products.products);
//     const userCarts = useSelector(state => state.carts.Carts);

//     const [isLoading, setIsLoading] = useState(true);
//     let currentActiveCart;

//     useEffect(() => {
//         if (userCarts && userCarts.Carts && Object.values(userCarts.Carts)?.length) {
//             for (let cart of userCarts.Carts) {
//                 if (cart?.isOrdered === false && cart?.user_id === currentUser?.id) {
//                     currentActiveCart = cart;
//                 }
//             }
//         }
//         setIsLoading(false);
//     }, [userCarts, currentUser]);

//     if (isLoading || !cartItems || !products) return <div className="loading-text">Loading...</div>;

//     let totalPrice = 0;
//     let totalQuantity = 0;

//     cartItems.forEach(item => {
//         totalPrice += products[item.product_id].price * item.quantity;
//         totalQuantity += item.quantity;
//     });
//     totalPrice = totalPrice.toFixed(2);

//     let tax = (totalPrice * 0.0863).toFixed(2);
//     let finalPrice = (Number(tax) + Number(totalPrice)).toFixed(2);

//     let today = new Date();
//     let delivery_date = new Date();

//     let cutOff = new Date();
//     cutOff.setDate(today.getDate());
//     cutOff.setHours(17);
//     cutOff.setMinutes(0);
//     cutOff.setMilliseconds(0);

//     let expiredDate = (cutOff.getTime() - today.getTime()) / 36e5;
//     if (expiredDate < 0) {
//         cutOff.setDate(today.getDate() + 1);
//         expiredDate = (cutOff.getTime() - today.getTime()) / 36e5;
//         delivery_date.setDate(today.getDate() + 3);
//     } else {
//         delivery_date.setDate(today.getDate() + 2);
//     }
//     expiredDate = expiredDate.toFixed(2).split(".");

//     delivery_date.setHours(17);
//     delivery_date.setMinutes(0);
//     delivery_date.setMilliseconds(0);
//     delivery_date = delivery_date.toDateString().split(" ");
//     delivery_date.shift();
//     delivery_date = delivery_date.join(" ");

//     const placeOrder = async (e) => {
//         e.preventDefault();

//         const order = {
//             cartId: currentActiveCart?.id,
//             productOrders: cartItems.map(item => ({
//                 productId: item.product_id,
//                 quantity: item.quantity
//             }))
//         };

//         const created = await dispatch(addOrderThunk(order));

//         if (created.byId) {
//             dispatch(emptyCartThunk());
//             setIsOpen(false);
//             navigate('/orders');
//         }
//     };

//     return (
//         <div id='checkout'>
//             <h2>Your Cart</h2>
//             <div className="image-slices">
//                 <img
//                     src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                     alt="Decorative"
//                     className="slice slice1"
//                 />
//                 <img
//                     src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                     alt="Decorative"
//                     className="slice slice2"
//                 />
//             </div>
//             <section className="shipping-method">
//                 <h2 className="check-title">
//                     Review items and shipping
//                 </h2>
//                 <div id="before-warning">
//                     <div className="inner-warning">
//                         <div className="grp1">
//                             <i className="fa-solid fa-circle-exclamation"></i>
//                             <span id="before-order">Before you place your order:</span>
//                         </div>
//                         <div className="warning-body">
//                             Shop with Points allows customers to pay for Amasport.com
//                             purchases using credit card rewards. To see if you have rewards
//                             available or to change the rewards amount for this purchase,
//                             please contact our
//                             <a
//                                 id="represent"
//                                 href="https://www.linkedin.com/in/wingnincheung/"
//                                 target="popup"
//                             >
//                                 {" "}
//                                 representative.
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="shipping-innerContainer">
//                     <div className="three-container">
//                         <div className="delivery-info">
//                             Delivery date: {delivery_date}
//                             <span id="ifyou">
//                                 {"  "}
//                                 if you order in the next {expiredDate[0]} hours and{" "}
//                                 {expiredDate[1]} minutes
//                             </span>
//                             <div className="ship-ama">Items shipped from Amasport.com</div>
//                             <div className="product-review">
//                                 {cartItems.map(item => {
//                                     const product = products[item.product_id];
//                                     return (
//                                         <div className="checkout-item" key={item.id}>
//                                             <img
//                                                 className="checkout-img"
//                                                 src={product.images[0]}
//                                                 alt="product"
//                                             ></img>
//                                             <div className="pro-title">
//                                                 <h5 className="pro-itemtitle">{product.name}</h5>
//                                                 <div className="second-check">
//                                                     <span id="checkout-price">${product.price}</span>
//                                                     {/* <img
//                                                         id="prime-img"
//                                                         style={{ height: "25px" }}
//                                                         src={primeIcon}
//                                                         alt="prime"
//                                                     ></img> */}
//                                                     <div id="qty">Qty: {item.quantity}</div>
//                                                     <div id="soldby">
//                                                         Sold by: {product.manufacturer}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                         <div className="right-checkout">
//                             <h4>Your Prime delivery Info:</h4>
//                             <div>
//                                 <input type="radio" name="prime" checked />
//                                 <label id="delivery-label">{delivery_date}</label>
//                                 <div id="des-date">FREE 2-day Prime Delivery</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="summary">
//                 <div id="place-order">
//                     <button className="addCart-button" onClick={placeOrder}>
//                         Place your order
//                     </button>
//                 </div>
//                 <div className="condition">
//                     By placing your order, you agree to Amasport's privacy notice and
//                     conditions of use.
//                 </div>
//                 <div>
//                     <h3 style={{ fontSize: "18px" }}>Order Summary</h3>
//                     <div className="table-container">
//                         <table>
//                             <tbody>
//                                 <tr>
//                                     <td>Items ({totalQuantity}):</td>
//                                     <td className="checkout-info">${totalPrice}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Shipping & handling:</td>
//                                     <td className="checkout-info">$0.00</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Total before tax:</td>
//                                     <td className="checkout-info">${totalPrice}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>Estimated tax to be collected:</td>
//                                     <td className="checkout-info ">${tax}</td>
//                                 </tr>
//                                 <div className="lasttr"></div>
//                                 <tr className="last-tr">
//                                     <td>
//                                         <h3>Order total:</h3>
//                                     </td>
//                                     <td>
//                                         <h3>${finalPrice}</h3>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default Checkout;


// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addOrderThunk } from "../../redux/orders";
// import { emptyCartThunk } from '../../redux/cart';
// import './Checkout.css';
// import { useCart } from '../../context/CartProvider';

// function Checkout() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { setIsOpen } = useCart();
//     const currentUser = useSelector(state => state.session.user);
//     const cartItems = useSelector(state => state.cartItems.CartItems);
//     const products = useSelector(state => state.products.products);
//     const userCarts = useSelector(state => state.carts.Carts);

//     let currentActiveCart;



//     if(userCarts && userCarts.Carts && Object.values(userCarts.Carts)?.length){
//         for(let cart of userCarts.Carts){
//             console.log('cart', cart)
//             if(cart?.isOrdered == false && cart?.user_id == currentUser?.id){
//                 currentActiveCart = cart
//             }
//         }
//     }

//     if (!cartItems || !products) return <div className="loading-text">Loading...</div>;

//     // Calculate total price and quantity
// let totalPrice = 0;
// let totalQuantity = 0;

// cartItems.forEach(item => {
//     const productPrice = products[item.product_id].price;
//     totalPrice += productPrice * item.quantity;
//     totalQuantity += item.quantity;
// });

// totalPrice = totalPrice.toFixed(2);

// // Calculate tax and final price
// const taxRate = 0.0863;
// const tax = (totalPrice * taxRate).toFixed(2);
// const finalPrice = (Number(totalPrice) + Number(tax)).toFixed(2);

// // Calculate delivery date
// const today = new Date();
// let deliveryDate = new Date();

// // Set cutoff time to 5 PM today
// const cutOffTime = new Date(today);
// cutOffTime.setHours(17, 0, 0, 0);

// // Calculate remaining time until cutoff
// let remainingHoursUntilCutoff = (cutOffTime - today) / 36e5;

// if (remainingHoursUntilCutoff < 0) {
//     // If cutoff has passed, set delivery date to 3 days from today
//     deliveryDate.setDate(today.getDate() + 3);
// } else {
//     // Otherwise, set delivery date to 2 days from today
//     deliveryDate.setDate(today.getDate() + 2);
// }

// // Format the delivery date
// deliveryDate.setHours(17, 0, 0, 0);
// const formattedDeliveryDate = deliveryDate.toDateString().split(" ").slice(1).join(" ");

// // Split remaining hours into hours and minutes
// remainingHoursUntilCutoff = Math.max(remainingHoursUntilCutoff, 0).toFixed(2).split(".");
// const remainingHours = remainingHoursUntilCutoff[0];
// const remainingMinutes = remainingHoursUntilCutoff[1];

// console.log({
//     totalPrice,
//     totalQuantity,
//     tax,
//     finalPrice,
//     formattedDeliveryDate,
//     remainingHours,
//     remainingMinutes
// });


//     const placeOrder = async (e) => {
//         e.preventDefault();

//         const order = {
//             cartId: currentActiveCart?.id,
//             productOrders: cartItems.map(item => ({
//                 productId: item.product_id,
//                 quantity: item.quantity
//             }))
//         };

//         const created = await dispatch(addOrderThunk(order));

//         if (created.byId) {
//             dispatch(emptyCartThunk());
//             setIsOpen(false);
//             navigate('/orders');
//         }
//     };

//     return (
//         <div id='checkout'>
//             <h2>Your Cart</h2>
//             <div className="image-slices">
//             <img
//                 src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                 alt="Decorative"
//                 className="slice slice1"
//             />
//             <img
//                 src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
//                 alt="Decorative"
//                 className="slice slice2"
//             />
//             </div>
//             <div className="checkout-products">
//                 {cartItems.map(item => {
//                     const product = products[item.product_id];
//                     return (
//                         <div key={item.id} className="order-item">
//                             <div className="order-item-details">
//                                 <h3>{product.name}</h3>
//                                 <p>Quantity: {item.quantity}</p>
//                                 <p>Price: ${product.price}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//             <button onClick={placeOrder} className='placeOrder-button'>Place Order</button>
//         </div>
//     );
// }
// export default Checkout;


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrderThunk } from "../../redux/orders";
import { emptyCartThunk } from '../../redux/cart';
import './Checkout.css';
import { useCart } from '../../context/CartProvider';

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setIsOpen } = useCart();
    const currentUser = useSelector(state => state.session.user);
    const cartItems = useSelector(state => state.cartItems.CartItems);
    const products = useSelector(state => state.products.products);
    const userCarts = useSelector(state => state.carts.Carts);

    let currentActiveCart;

    if(userCarts && userCarts.Carts && Object.values(userCarts.Carts)?.length){
        for(let cart of userCarts.Carts){
            console.log('cart', cart)
            if(cart?.isOrdered == false && cart?.user_id == currentUser?.id){
                currentActiveCart = cart;
            }
        }
    }

    if (!cartItems || !products) return <div className="loading-text">Loading...</div>;

    let totalPrice = 0;
    let totalQuantity = 0;

    cartItems.forEach(item => {
        totalPrice += products[item.product_id].price * item.quantity;
        totalQuantity += item.quantity;
    });
    totalPrice = totalPrice.toFixed(2);

    const taxRate = 0.0863;
    const tax = (totalPrice * taxRate).toFixed(2);
    const finalPrice = (Number(totalPrice) + Number(tax)).toFixed(2);

    const today = new Date();
    let deliveryDate = new Date();

    const cutOffTime = new Date(today);
    cutOffTime.setHours(17, 0, 0, 0);

    let remainingHoursUntilCutoff = (cutOffTime - today) / 36e5;

    if (remainingHoursUntilCutoff < 0) {
        deliveryDate.setDate(today.getDate() + 3);
    } else {
        deliveryDate.setDate(today.getDate() + 2);
    }

    remainingHoursUntilCutoff = Math.max(remainingHoursUntilCutoff, 0).toFixed(2).split(".");
    const remainingHours = remainingHoursUntilCutoff[0];
    const remainingMinutes = remainingHoursUntilCutoff[1];

    deliveryDate.setHours(19, 0, 0, 0);
    const formattedDeliveryDate = deliveryDate.toDateString().split(" ").slice(1).join(" ");

    const placeOrder = async (e) => {
        e.preventDefault();

        const order = {
            cartId: currentActiveCart?.id,
            productOrders: cartItems.map(item => ({
                productId: item.product_id,
                quantity: item.quantity
            }))
        };

        const created = await dispatch(addOrderThunk(order));

        if (created.byId) {
            dispatch(emptyCartThunk());
            setIsOpen(false);
            navigate('/orders');
        }
    };

    return (
        <div id='checkout'>
            <h2>Your Cart</h2>
            <div className="image-slices">
            <img
                src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
                alt="Decorative"
                className="slice slice1"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
                alt="Decorative"
                className="slice slice2"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/kawaii-pokemon.gif"
                alt="Decorative"
                className="slice slice2"
            />
            </div>
            <div className="checkout-products">
                {cartItems.map(item => {
                    const product = products[item.product_id];
                    return (
                        <div key={item.id} className="order-item">
                            <div className="order-item-details">
                                <h3>{product.name}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <section className="summary">
                <h3>Order Summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Items ({totalQuantity}):</td>
                            <td className="checkout-info">${totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Shipping :</td>
                            <td className="checkout-info">$0.00</td>
                        </tr>
                        <tr>
                            <td>Total before tax:</td>
                            <td className="checkout-info">${totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Estimated tax :</td>
                            <td className="checkout-info">${tax}</td>
                        </tr>
                        <tr className="last-tr">
                            <td><h3>Order total:</h3></td>
                            <td><h3>${finalPrice}</h3></td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="delivery-info">
                <h4>Delivery Information:</h4>
                <p>Delivery date: {formattedDeliveryDate}</p>
                <p>Order within the next {remainingHours} hours and {remainingMinutes} minutes for delivery by {formattedDeliveryDate}.</p>
            </section>
            <section className="payment-method">
                <h4>Payment Method:</h4>
                <div className="payment-details">
                    <img
                        src="https://nurawsbucket.s3.amazonaws.com/1-15741_visa-icon-png-high-resolution-visa-logo-png.png"
                        alt="Visa"
                        className="payment-icon"
                    />
                    <span>VISA ending with 2100</span>
                </div>
            </section>
            <section className="reward-points">
                <h4>Reward Points:</h4>
                <p>Shop with Points allows customers to pay for purchases using credit card rewards. To see if you have rewards available or to change the rewards amount for this purchase, please contact our
                <a
                id="specialist"
                href="https://www.linkedin.com/in/nur-unlu/"

              >
                {" "}
                rewards specialist.
              </a>
            </p>
            </section>
            <button onClick={placeOrder} className='placeOrder-button'>Place Order</button>
        </div>
    );
}
export default Checkout;
