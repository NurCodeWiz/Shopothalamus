import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderItem from "../OrderItem/OrderItem";
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

    // useEffect(() => {
    //     setIsOpen(false);
    // }, [setIsOpen]);

    if(userCarts && userCarts.Carts && Object.values(userCarts.Carts)?.length){
        for(let cart of userCarts.Carts){
            console.log('cart', cart)
            if(cart?.isOrdered == false && cart?.user_id == currentUser?.id){
                currentActiveCart = cart
            }
        }
    }

    if (!cartItems || !products) return <div className="loading-text">Loading...</div>;

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
            <h3>Your Cart</h3>
            <div className="image-slices">
            <img
                src="https://nurawsbucket.s3.amazonaws.com/brain-408_256.gif"
                alt="Decorative"
                className="slice slice1"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/brain-408_256.gif"
                alt="Decorative"
                className="slice slice2"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/brain-408_256.gif"
                alt="Decorative"
                className="slice slice3"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/brain-408_256.gif"
                alt="Decorative"
                className="slice slice4"
            />
            <img
                src="https://nurawsbucket.s3.amazonaws.com/brain-408_256.gif"
                alt="Decorative"
                className="slice slice"
            />
            </div>
            <div className="checkout-products">
                {cartItems.map(item => (
                    <OrderItem key={item.id} quantity={item.quantity} product={products[item.product_id]} />
                ))}
            </div>
            <button onClick={placeOrder} className='checkout-button'>Place Order</button>
        </div>
    );
}
export default Checkout;
