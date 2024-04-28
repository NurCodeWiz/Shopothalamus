import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/products';
import "./ProductDetails.css";
import { reviewsByProduct} from '../../redux/reviews'
import { getAllUsersThunk } from '../../redux/users';
import { MdOutlineStar,MdOutlineStarBorder } from "react-icons/md";
import Carts from '../Carts/Carts'
import ReviewForm from '../ReviewForm/ReviewForm';
// import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";
import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { addItemToCartThunk, updateQuantityThunk } from "../../redux/cartItems";
import { createCartThunk, allUserCartsThunk } from "../../redux/cart";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


export default function ProductDetails() {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { products } = useSelector(state => state.products)
    const  reviews  = useSelector(state => state.reviews)
    console.log('===>', (useSelector(state => state.reviews)))
    // const reviewId = Object.keys(reviews);
    // console.log('@reviewIds',reviewIds)

    const user = useSelector(state => state.session.user);
    const [displayImageURL, setDisplayImageURL] = useState('');
    const [date, setDate] = useState('')
    const [showReviewForm, setShowReviewForm] = useState(false);
    const allCarts = useSelector(state => state.carts.Carts)
    const [quantity, setQuantity] = useState('1')
    // const { setModalContent } = useModal();
    // const [delRev, setDelRev ]= useState(false)
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

        if (!Object.values(allCarts)?.length) {
            console.log('allUserCartsThunk', allCarts)
            dispatch(allUserCartsThunk())
        }

    }, [dispatch, productId, products, reviews]);
    console.log(Object.keys(reviews).length)


    if (!products || !products[productId]) {
        return <div>LoadingXXXX...</div>;
    }

    if (!allCarts.Carts)
    {
        return <div>LoadingXXXX...</div>;
    }

    // const handleReviewDeleted = () => {
    //     dispatch(reviewsByProduct(productId)); // Re-fetch reviews after one is deleted
    // };

    // const renderDelete = () => {
    //     setDelRev(!delRev)
    // }
    console.log(reviews)
    console.log('allcarts-new:', allCarts)
    let activeCartObj
    if(Object.values(allCarts.Carts)?.length){
        for(let cart of allCarts.Carts){
            console.log('cart->>>>>>>:', cart)
            if(cart?.isOrdered == false){
                activeCartObj = cart
            }
        }
    }

    let findInCart = activeCartObj?.cart_items?.find(item => item?.product_id == productId)
    console.log('activeCartObj->:', activeCartObj)
    console.log('findInCart->:', findInCart)

    // const addToCart = async (productId) => {
    //     let addItem = {
    //         cart_id: activeCartObj?.id,
    //         product_id: productId,
    //         quantity: quantity
    //     }
    //     if(activeCartObj && findInCart){
    //         // product is already in the cart
    //         let updateQty = {
    //             product_id: productId,
    //             quantity: (parseInt(findInCart?.quantity) + parseInt(quantity))
    //         }
    //         return await dispatch(updateQuantityThunk(updateQty, findInCart?.id))
    //     }
    //     if(activeCartObj){
    //         // Has an open cart, add product to this cart
    //         await dispatch(addItemToCartThunk(addItem, activeCartObj?.id))
    //     }
    //     else{
    //         // create new cart, add product to new cart
    //         const createCart = await dispatch(createCartThunk())
    //         const newCartId = createCart?.id;
    //         await dispatch(addItemToCartThunk(addItem, newCartId))
    //     }
    //     return
    // }
    const addToCart = async (productId) => {
        let addItem = {
            product_id: productId,
            quantity: quantity,
        };

        // If there's an active cart and the product is already in the cart, update the quantity.
        if (activeCartObj && findInCart) {
            let updateQty = {
                product_id: productId,
                quantity: (parseInt(findInCart.quantity) + parseInt(quantity)),
            };
            await dispatch(updateQuantityThunk(updateQty, findInCart.id));
        } else if (activeCartObj) {
            // If there's an active cart, add the product to this cart.
            console.log('activeCartObj........', activeCartObj.id)
            addItem.cart_id = activeCartObj.id;
            await dispatch(addItemToCartThunk(addItem, addItem.cart_id));
        } else {
            // If there's no active cart, try to create a new cart and add the product to the new cart.
            try {
                const createdCartResponse = await dispatch(createCartThunk());
                const newCartId = createdCartResponse?.payload?.id; // Make sure this path matches the structure of your response
                if (newCartId) {
                    addItem.cart_id = newCartId;
                    await dispatch(addItemToCartThunk(addItem));
                } else {
                    console.error("Failed to create a new cart. No cart ID returned from createCartThunk.");
                }
            } catch (error) {
                console.error("Error in createCartThunk:", error);
            }
        }
    };

    const singleProduct = products[productId];
    console.log('====>',singleProduct)

    const allProductImages = singleProduct.images || [];
    const allProductReviews = singleProduct.reviews || [];
    console.log('#####',allProductReviews)


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

        // const openDeleteModal = (reviewId) => {
        //     setModalContent(
        //         <DeleteReview
        //             reviewId={reviewId}
        //             onReviewDeleted={() => console.log("Review Deleted!")}
        //         />
        //     );
        // };

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
                               {review?.user_id === user?.id && (
                            <div className='review-buttons'>
                            <button className='review-btns'>
                                <NavLink to={`/products/${productId}/review/${review?.id}/edit`} className='update-rev-btn'>Update Review</NavLink>
                            </button>
                            <button className='review-btns delete-rev-btn'>
                                <OpenModalMenuItem
                                    itemText='Delete Review'
                                    modalComponent={<DeleteReview reviewId={review?.id} productId={productId} onReviewDeleted={() => {}}/>}
                                />
                            </button>
                        </div>
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
                {user && (
                        <div className="cart-item-feature">
                            <form className='options-container'>
                                <select onChange={(e) => setQuantity(e.target.value)}>
                                    <option value = '1'>Qty: 1</option>
                                    <option value = '2'>Qty: 2</option>
                                    <option value = '3'>Qty: 3</option>
                                    <option value = '4'>Qty: 4</option>
                                    <option value = '5'>Qty: 5</option>
                                    <option value = '6'>Qty: 6</option>
                                    <option value = '7'>Qty: 7</option>
                                    <option value = '8'>Qty: 8</option>
                                    <option value = '9'>Qty: 9</option>
                                    <option value = '10'>Qty: 10</option>
                                </select>
                            </form>
                            <button className='add-to-cart-btn details-add-cart-btn' onClick={() => addToCart(singleProduct?.id)}>
                                <OpenModalMenuItem
                                    itemText='Add to cart'
                                    modalComponent={<Carts />}
                                />
                            </button>
                        </div>
                    )}
                    {!user && (
                        <p className='msg-to-add-cart detail-log-sign-msg'>
                            <OpenModalMenuItem
                                itemText={<span className='login-signup-text'>Log In</span>}
                                modalComponent={<LoginFormModal />}
                                className='login-signup-text'
                            />
                            or
                            <OpenModalMenuItem
                                itemText={<span className='login-signup-text'>Sign Up</span>}
                                modalComponent={<SignupFormModal />}
                            />
                        to add this item to your cart</p>)
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
                    {/* {singleProduct.provider_id !== user?.id &&
                    <div className="pd-user-btns">
                        <button onClick={() => addToCart(singleProduct)}>Add to cart</button>
                    </div>
                } */}
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
