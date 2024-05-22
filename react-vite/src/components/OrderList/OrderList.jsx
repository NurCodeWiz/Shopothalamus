import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrdersThunk, deleteOrderThunk } from '../../redux/orders';
import OrderImagesSlider from './OrderImagesSlider';
import './OrderList.css';
import { useModal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';

// This custom hook memoizes the orders array to prevent unnecessary re-renders.
// 'use memo'caches the result of the orders array, and only recalculates it if ordersState.allIds or ordersState.byId changes.
const useMemoizedOrders = (ordersState) => {
    return useMemo(() => {
        return ordersState.allIds.map(id => ordersState.byId[id]);
    }, [ordersState.allIds, ordersState.byId]);
};

const OrderPage = () => {
    const dispatch = useDispatch();
    const ordersState = useSelector(state => state.orders);
    const orders = useMemoizedOrders(ordersState);
    const [isLoading, setIsLoading] = useState(true);
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(getUserOrdersThunk());
            setIsLoading(false);
        };

        fetchOrders();
    }, [dispatch]);

    if (!orders || isLoading) {
        return <div>Loading...</div>;
    }

    // Extract the first product image from each product in the orders
    const allProductImages = orders.flatMap(order =>
        order.products.map(product => product.image?.url).filter(Boolean)
    );

    const handleCancelOrder = (orderId) => {
        dispatch(deleteOrderThunk(orderId));
        closeModal();
    };

    const openDeleteModal = (orderId) => {
        setModalContent(
            <div className='delete-order-modal'>
                <h1 className='confirm-delete-text'>Are you sure you want to cancel this order?</h1>
                <div>
                    <button className='delete-button confirm' onClick={() => handleCancelOrder(orderId)}>
                        Yes, Cancel
                    </button>
                    <button className='delete-button cancel' onClick={closeModal}>
                        No, Keep This Order
                    </button>
                </div>
            </div>
        );
    };

    // console.log('ORDERS', Object.values(orders));

    return (
        <div className="order-page">
            <h1>Your Orders</h1>
            <OrderImagesSlider imageUrls={allProductImages} />
            {orders.map(order => (
                <div key={order.id} className="order-item">
                    <p>Order ID: {order.id}</p>
                    <p>Status: {order.status}</p>
                    {order.products.map(product => (
                        <div key={product.productId}>
                            <p>Name: <NavLink to={`/products/${product.productId}`}>{product.name}</NavLink></p>
                            <p>Quantity: {product.quantity}</p>
                            {product.image && <img className="product-image" src={product.image.url} alt={product.name} />}
                        </div>
                    ))}
                    <button className='delete-button' onClick={() => openDeleteModal(order.id)}>Delete Order</button>
                </div>
            ))}
        </div>
    );
};

export default OrderPage;
