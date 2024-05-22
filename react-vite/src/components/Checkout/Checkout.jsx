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
            // console.log('cart', cart)
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
