import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products';
import "./ProductDetails.css";
import { reviewsByProduct} from '../../redux/reviews'
import { getAllUsersThunk } from '../../redux/users';
import { MdOutlineStar,MdOutlineStarBorder } from "react-icons/md";
import ReviewForm from '../ReviewForm/ReviewForm';
import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";


export default function ProductDetails() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const { reviews } = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user);
    const [displayImageURL, setDisplayImageURL] = useState('');
    const [date, setDate] = useState('')
    const [showReviewForm, setShowReviewForm] = useState(false);
    const { setModalContent } = useModal();

    useEffect(() => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2); // Setting delivery date 2 days from today
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(deliveryDate.toLocaleDateString('en-US', options));
    }, []);

    useEffect(() => {
        if (!products || !products[productId] || !products[productId].images) {
           dispatch(getSingleProduct(productId))
           dispatch(reviewsByProduct(productId))
           dispatch(getAllUsersThunk())

        } else {
            setDisplayImageURL(products[productId].images[0]?.url);
        }
    }, [dispatch, productId, products,reviews]);


    if (!products || !products[productId]) {
        return <div>Loading...</div>;
    }


    console.log(reviews)

    const singleProduct = products[productId];
    console.log('====>',singleProduct)

    const allProductImages = singleProduct.images || [];
    const allProductReviews = singleProduct.reviews || [];
    console.log('#####',allProductReviews)


    const addToCart = () => {

    };
    function formatDateV2(date) {
        const parsedDate = new Date(date);
        const options = {
          month: 'long',
          year: 'numeric'
        };
        const dateFormatter = new Intl.DateTimeFormat('default', options);
        return dateFormatter.format(parsedDate);
    }
    function starsIcon(avgRating){
        let filledStar = Math.floor(avgRating)
        let array =[1,2,3,4,5]
        let starArray = []
        array.forEach(i => {
            if( i <= filledStar){
                starArray.push(<MdOutlineStar key={i}/>)
            }
            else{
                starArray.push(<MdOutlineStarBorder key={i}/>)
            }
        })
        return starArray
    }

    const hasReview = allProductReviews.some(review =>
        review?.userId === user?.id);

        const openDeleteModal = (reviewId) => {
            setModalContent(
                <DeleteReview
                    reviewId={reviewId}
                    onReviewDeleted={() => console.log("Review Deleted!")}
                />
            );
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
                {user && singleProduct.provider_id !== user.id && !hasReview && (
                    <button
                        className='new-review-button'
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        Write a customer review
                    </button>
                )}
                {user && singleProduct.provider_id == user.id && (
                    <p className="cannot-review-text">*You cannot review your own product</p>
                )}
                {showReviewForm &&  (
                    <ReviewForm
                        productId={singleProduct.id}
                        buttonText="Submit Review"
                        hideForm={() => setShowReviewForm(false)}
                    />
                )}
                {allProductReviews.map(review => (
                        <div key={review?.id} className="review">
                            <div className='review-cont'>
                            <p className='review-txt'>{user[review?.user_id]?.firstName} <span className='review-date-txt'>wrote a review on {review && (formatDateV2(review?.createdAt))}</span></p>
                            <p className='rating-icons'>{starsIcon(review?.rating)}</p>
                            <div className="review-content">
                                {review?.image_url === null ? null :
                                    <img className='review-image' src={review?.image_url} alt={review?.image_url || "Review Image"} />
                                }
                               <p>{review?.review_content}</p>
                               {review?.userId === user?.id && (
                            <button onClick={() => openDeleteModal(review?.id)}>
                                Delete Review
                            </button>
                        )}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pd-col-right">
                {singleProduct.provider_id !== user?.id ? null :
                    <div className="pd-provider-btns">
                        <button>Update Listing</button>
                        <button>Delete Listing</button>
                    </div>
                }
                {/* <div className="sec-pricing">
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
        </div> */}

                <p>{singleProduct.name}</p>
                <span>{/* provider name */}</span>
                <div className="rating-description">
                {
                allProductReviews.map(review => (
                <div key={review?.id} className="review">
                 <p className='rating-icons'>{starsIcon(review?.rating)}</p>
                </div>
                ))}
                </div>
                    {singleProduct.provider_id !== user?.id &&
                    <div className="pd-user-btns">
                        <button onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    </div>
                }
                <p>{singleProduct.description}</p>
                <div className="pd-contact-seller">
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
                    <button>Contact Seller</button>
                </div>
              </div>

            </div>
    );
}
