import { useDispatch, useSelector } from 'react-redux'
import { getUserOrdersThunk } from '../../redux/orders';
import { useEffect, useState } from 'react';
import './OrderList.css';

function OrderList() {
    const dispatch = useDispatch();
    const { byId: orders } = useSelector(state => state.orders);
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     dispatch(getUserOrdersThunk());
    // }, [dispatch]);
    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(getUserOrdersThunk());
            setIsLoading(false);
        };

        fetchOrders();
    }, [dispatch]);


    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log('ORDERS', Object.values(orders))

    return (
        <div id="order-list">
            <h3>Your Orders</h3>
            {/* { Object.values(orders)?.length ?
                // orders.map(id => (
                //     <Order key={id} order={orders[id]} />
                // )) :
                <h2> {Object.values(orders)?.length} </h2>:
                <p>No past orders to display</p>
            } */}
            <img
                src="https://nurawsbucket.s3.amazonaws.com/original.webp"
                alt="Decorative"
                className="order-image"
            />
            <img
            src="https://nurawsbucket.s3.amazonaws.com/s-l1200.jpeg"
            alt="Decorative"
            className="image_review"
            />

            {Object.values(orders)?.length ? (
                Object.values(orders).map(order => (
                    <div key={order.id} className="order">
                        <h4>Order ID: {order.id}</h4>
                        <h5>Status: {order.status}</h5>
                        <div className="products">
                            {order?.products?.map(product => (
                                <div key={product.productId} className="product">
                                    <p>Name: {product.name}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No past orders to display</p>
            )}

        </div>
    );
}

export default OrderList;
