import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { reviewsByProduct } from "../../redux/reviews";


function UpdateReview(){
    const triggerDispatch = useDispatch();
    const {reviewID, productID} = useParams();
    const reviewList = useSelector(state => state.reviews.detail);

    useEffect(() => {
        triggerDispatch(reviewsByProduct(productID));
    }, [triggerDispatch, productID]);

    if (!reviewList?.length) {
        return <div className="review-loading">Processing...

        </div>;
    }

    let reviewDetails;
    for (let review of reviewList) {
        if (review?.id === reviewID) {
            reviewDetails = review;
        }
    }

    let actionLabel = 'Update';
    return (
        <>
            <h1 className='review-form-header'>Update Review</h1>
            <ReviewForm review={reviewDetails} buttonLabel={actionLabel}/>
        </>
    );
}

export default UpdateReview;
