// import { useDispatch, useSelector } from "react-redux";
// import ReviewForm from "../ReviewForm/ReviewForm";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { reviewsByProduct } from "../../redux/reviews";


// function UpdateReview(){
//     const triggerDispatch = useDispatch();
//     const {reviewID, productID} = useParams();
//     const reviewList = useSelector(state => state.reviews?.Reviews);

//     useEffect(() => {
//         triggerDispatch(reviewsByProduct(productID));
//     }, [triggerDispatch, productID]);

//     if (!reviewList?.length) {
//         return <div className="review-loading">Processing...

//         </div>;
//     }

//     let reviewDetails;
//     for (let review of reviewList) {
//         if (review?.id === reviewID) {
//             reviewDetails = review;
//         }
//     }

//     let actionLabel = 'Update';
//     return (
//         <>
//             <h1 className='review-form-header'>Update Review</h1>
//             <ReviewForm review={reviewDetails} buttonLabel={actionLabel}/>
//         </>
//     );
// }

// export default UpdateReview;
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { reviewsByProduct } from "../../redux/reviews"; // Corrected import path

function UpdateReview() {
    const dispatch = useDispatch(); // Changed variable name to 'dispatch'
    const { productId, reviewId } = useParams();
    const reviewList = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(reviewsByProduct(productId)); // Used 'dispatch' instead of 'triggerDispatch'
    }, [dispatch, productId]); // Added 'dispatch' to dependency array

    console.log('productId', productId)

    if (!reviewList || !reviewList.reviews)
    {
        return <div className="review-loading">Loading...</div>;
    }
    console.log('reviewList', reviewList)

    if (!Object.values(reviewList.reviews).length) {
        return <div className="review-loading">No reviews to update...</div>;
    }

    let reviewDetails;
    for (let review of Object.values(reviewList.reviews)) {
        if (review.id == reviewId) {
            reviewDetails = review;
        }
    }

    console.log('reviewDetails', reviewDetails)
    let actionLabel = 'Update';
    return (
        <>
            <h1 className='review-form-header'>Update Review</h1>
            {/* Corrected prop names */}
            <ReviewForm review={reviewDetails} buttonText={actionLabel}/>
        </>
    );
}

export default UpdateReview;
