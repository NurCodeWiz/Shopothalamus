import { useSelector, useDispatch } from 'react-redux';
import { deleteOrderThunk } from '../../redux/orders';
import { useModal } from '../../context/Modal';
import { FaXmark } from 'react-icons/fa6';
import OrderItem from '../OrderItem/OrderItem';
import './Order.css';

function Order({ order }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const { setModalContent, closeModal } = useModal();

    if (!order || !products) return null;

    const handleCancelOrder = () => {
        dispatch(deleteOrderThunk(order.id));
        closeModal();
    };

    const openDeleteModal = () => {
        setModalContent(
            <div className='delete-order-modal'>
                <h1 className='confirm-delete-text'>Are you sure you want to cancel this order?</h1>
                <div>
                    <button className='delete-button confirm' onClick={handleCancelOrder}>
                        Yes, Cancel
                    </button>
                    <button className='delete-button cancel' onClick={closeModal}>
                        No, Keep This Order
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='order'>
            <h5 className='order-number'>Order No. {order.id}</h5>
            <img
                src="https://nurawsbucket.s3.amazonaws.com/original.webp"
                alt="Decorative"
                className="order-image"
            />
            <FaXmark onClick={openDeleteModal} size={30} />
            <p className='order-status'>{order.status}</p>
            <div className="order-products">
                {order.products.map(product => (
                    <OrderItem key={product.productId} product={products[product.productId]} quantity={product.quantity} />
                ))}
            </div>
        </div>
    );
}

export default Order;
