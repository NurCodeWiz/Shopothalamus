
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { reviewsByProduct } from "../../redux/reviews";

function UpdateReview() {
    const dispatch = useDispatch();
    const { productId, reviewId } = useParams();
    const reviewList = useSelector(state => state.reviews);
    const [showReviewForm, setShowReviewForm] = useState(true);

    useEffect(() => {
        dispatch(reviewsByProduct(productId));
    }, [dispatch, productId]);

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
            {/* {showReviewForm &&  (
                    <ReviewForm
                    review={reviewDetails}
                        buttonText={actionLabel}
                        hideForm={() => setShowReviewForm(false)}
                    />
                )} */}
            <ReviewForm
                review={reviewDetails}
                buttonText={actionLabel}
            />
        </>
    );
}

export default UpdateReview;
