import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products';
import "./ProductDetails.css";

export default function ProductDetails() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const user = useSelector(state => state.session.user);
    const [displayImageURL, setDisplayImageURL] = useState('');
    const [date, setDate] = useState('')
    useEffect(() => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2); // Setting delivery date 2 days from today
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(deliveryDate.toLocaleDateString('en-US', options));
    }, []);

    useEffect(() => {
        if (!products || !products[productId] || !products[productId].images) {
           dispatch(getSingleProduct(productId));
        } else {
            setDisplayImageURL(products[productId].images[0]?.url);
        }
    }, [dispatch, productId, products]);
    if (!products || !products[productId]) {
        return <div>Loading...</div>;
    }
    if (!products || !products[productId]) {
        return <div>Loading...</div>;
    }
    const singleProduct = products[productId];
    const allProductImages = singleProduct.images || [];

    const addToCart = () => {

    };

    return (
        <div className="pd-col-wrap">
            <div className="pd-col-left">
                <div className="pd-img-wrap">
                    <div className='pd-all-imgs'>
                        {allProductImages.map(image => (
                            <img
                                src={image.url}
                                alt={`Product ${image.id}`}
                                key={image.id}
                                onClick={() => setDisplayImageURL(image.url)}
                            />
                        ))}
                    </div>
                    <div>
                        <img
                            src={displayImageURL || allProductImages[0]?.url}
                            alt={`${singleProduct.name}`}
                            className="pd-main-img"
                        />
                    </div>
                </div>
                <div className="pd-rev-sec">
                    <h2>Reviews</h2>

                </div>
            </div>
            <div className="pd-col-right">
                {singleProduct.vendor_id !== user?.id ? null :
                    <div className="pd-vendor-btns">
                        <button>Update Listing</button>
                        <button>Delete Listing</button>
                    </div>
                }
                <div className="sec-pricing">
                  <div className="price-wrap">
                   <span className="symbol-currency">$</span>
                   <span className="value-price">{singleProduct.price}</span>
                </div>
                <div className="ship-detail"> & FREE Returns</div>
                <div className="ship-detail">
                  FREE Prime delivery
                  <span className="date-info">
                 {date}.<span> Order by</span>
                <span> 5 p.m of today</span>
            </span>
        </div>
        <h4 className="in-stock">In Stock</h4>
        </div>

                <p>{singleProduct.name}</p>
                <span>{/* vendor name */}</span>
                <span>{/* review stars */}</span>
                    {singleProduct.vendor_id !== user?.id &&
                    <div className="pd-user-btns">
                        <button onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    </div>
                }
                <p>{singleProduct.description}</p>
                <div className="pd-contact-seller">
                    <button>Contact Seller</button>
                </div>
              </div>

        </div>
    );
}
